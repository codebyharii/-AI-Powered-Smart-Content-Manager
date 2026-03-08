package com.smartcontent.service;

import com.smartcontent.dto.AuthDto;

public interface AuthService {

    AuthDto.AuthResponse register(AuthDto.RegisterRequest request);

    AuthDto.AuthResponse login(AuthDto.LoginRequest request);
}
