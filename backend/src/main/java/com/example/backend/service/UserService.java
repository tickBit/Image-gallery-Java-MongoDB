package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.repository.UserRepository;

import com.example.backend.model.User;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
    @Autowired
    private JwtService jwtService;

    
	@Autowired
	private AuthenticationManager authenticationManager;

    // Login user and return user details if successful
    public User loginUser(LoginRequest loginDto) {
		// Authenticate the user
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginDto.getUsername(),
						loginDto.getPassword()
				)
		);

		// If authentication is successful, retrieve user details
		
		return userRepository.findByUsername(loginDto.getUsername())
				.orElseThrow();
	}

	public User getUser(String username) {
		return userRepository.findByUsername(username).orElse(null);
	}
}