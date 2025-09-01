package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import com.example.backend.response.LoginResponse;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtService jwtService;

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginDto, Principal p) {

        String username = loginDto.getUsername();
        String password = loginDto.getPassword();

        if (p != null) {
            return ResponseEntity.badRequest().body(new LoginResponse("Please logout first"));
        }

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(new LoginResponse("Invalid credentials"));
        }
        
        user = userService.loginUser(loginDto);
        String jwtToken = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setTokenExpireTime(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
    
    @PostMapping("/auth/register")
    public ResponseEntity<?> reigsterUser(@RequestBody RegisterRequest request, Principal principal) {
        if (principal != null) {
            return ResponseEntity.badRequest().body("Please logout first");
        }

        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Hash the password
        user.setEmail(request.getEmail());
        userRepo.save(user);

        // get token immediately after registration
        String jwtToken = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setTokenExpireTime(jwtService.getExpirationTime());
		
        return ResponseEntity.ok(loginResponse);

    }

    @DeleteMapping("/auth/deleteme")
    public void deleteMe(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("You are not authenticated");
        }

        String username = authentication.getName();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepo.deleteById(user.getId());
    }
}
