package com.digitallegacy.app.controller;

import com.digitallegacy.app.model.TrustedContact;
import com.digitallegacy.app.model.User;
import com.digitallegacy.app.repository.TrustedContactRepository;
import com.digitallegacy.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trusted")
public class TrustedContactController {

    @Autowired
    private TrustedContactRepository trustedContactRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<TrustedContact> list(@AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        return trustedContactRepository.findByOwner(u);
    }

    @PostMapping
    public TrustedContact create(@AuthenticationPrincipal UserDetails principal, @RequestBody TrustedContact tc) {
        User u = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        tc.setOwner(u);
        return trustedContactRepository.save(tc);
    }
}
