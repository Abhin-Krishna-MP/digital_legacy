package com.digitallegacy.app.controller;

import com.digitallegacy.app.dto.*;
import com.digitallegacy.app.model.User;
import com.digitallegacy.app.security.JwtUtils;
import com.digitallegacy.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    // Removed unused userRepository

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        User u = authService.register(req);
        return ResponseEntity.ok(u);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
    );
    String token = jwtUtils.generateToken(req.getUsername());
    AuthResponse response = new AuthResponse(token, "Bearer");
    return ResponseEntity.ok(response);
    }
}
