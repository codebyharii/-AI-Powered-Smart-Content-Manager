package com.smartcontent.controller;

import com.smartcontent.dto.ApiResponse;
import com.smartcontent.dto.AuthDto;
import com.smartcontent.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<ApiResponse<AuthDto.AuthResponse>> register(
            @Valid @RequestBody AuthDto.RegisterRequest request) {
        
        AuthDto.AuthResponse response = authService.register(request);
        ApiResponse<AuthDto.AuthResponse> apiResponse = 
                ApiResponse.success(response, "User registered successfully");
        
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Login user")
    public ResponseEntity<ApiResponse<AuthDto.AuthResponse>> login(
            @Valid @RequestBody AuthDto.LoginRequest request) {
        
        AuthDto.AuthResponse response = authService.login(request);
        ApiResponse<AuthDto.AuthResponse> apiResponse = 
                ApiResponse.success(response, "Login successful");
        
        return ResponseEntity.ok(apiResponse);
    }
}
