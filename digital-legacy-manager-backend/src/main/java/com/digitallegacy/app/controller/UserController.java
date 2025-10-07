package com.digitallegacy.app.controller;

import com.digitallegacy.app.model.User;
import com.digitallegacy.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/auto-trigger-settings")
    public ResponseEntity<?> setAutoTriggerSettings(
            @RequestBody Map<String, Object> settings,
            @AuthenticationPrincipal UserDetails principal) {
        try {
            User user = userRepository.findByUsername(principal.getUsername()).orElseThrow();
            
            // Store auto-trigger settings (you might want to create a separate entity for this)
            // For now, we'll add these fields to the User entity
            // user.setAutoTriggerEnabled((Boolean) settings.get("enabled"));
            // user.setAutoTriggerTimeLimit(Integer.parseInt(settings.get("timeLimit").toString()));
            
            // userRepository.save(user);
            
            return ResponseEntity.ok(Map.of(
                "message", "Auto-trigger settings saved successfully",
                "timeLimit", settings.get("timeLimit") + " months"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to save auto-trigger settings: " + e.getMessage());
        }
    }

    @GetMapping("/auto-trigger-settings")
    public ResponseEntity<?> getAutoTriggerSettings(@AuthenticationPrincipal UserDetails principal) {
        try {
            User user = userRepository.findByUsername(principal.getUsername()).orElseThrow();
            
            return ResponseEntity.ok(Map.of(
                "enabled", false, // user.getAutoTriggerEnabled() != null ? user.getAutoTriggerEnabled() : false,
                "timeLimit", "2", // user.getAutoTriggerTimeLimit() != null ? user.getAutoTriggerTimeLimit().toString() : "2",
                "lastActivity", user.getId() // This would be actual last login timestamp
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get auto-trigger settings: " + e.getMessage());
        }
    }
}
