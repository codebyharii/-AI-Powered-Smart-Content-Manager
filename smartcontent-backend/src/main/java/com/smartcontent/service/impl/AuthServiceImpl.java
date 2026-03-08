package com.smartcontent.service.impl;

import com.smartcontent.dto.AuthDto;
import com.smartcontent.entity.Role;
import com.smartcontent.entity.User;
import com.smartcontent.exception.DuplicateResourceException;
import com.smartcontent.repository.RoleRepository;
import com.smartcontent.repository.UserRepository;
import com.smartcontent.security.JwtUtil;
import com.smartcontent.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request) {

        log.info("Registering new user: {}", request.getUsername());

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already exists: " + request.getUsername());
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .isActive(true)
                .isDeleted(false)
                .roles(new HashSet<>())
                .build();

        Set<Role> roles = determineRoles(request.getRoles());
        roles.forEach(user::addRole);

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(savedUser.getUsername(), null);

        log.info("User registered successfully: {}", savedUser.getUsername());

        return buildAuthResponse(token, savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthDto.AuthResponse login(AuthDto.LoginRequest request) {

        log.info("User login attempt: {}", request.getUsernameOrEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsernameOrEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository
                .findByUsernameOrEmailAndNotDeleted(request.getUsernameOrEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getUsername(), null);

        log.info("User logged in successfully: {}", user.getUsername());

        return buildAuthResponse(token, user);
    }

    private Set<Role> determineRoles(Set<String> roleNames) {

        Set<Role> roles = new HashSet<>();

        if (roleNames == null || roleNames.isEmpty()) {

            Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER).orElse(null);

            if (userRole == null) {
                userRole = createRole(Role.RoleName.ROLE_USER, "Default user role");
            }

            roles.add(userRole);

        } else {

            for (String roleName : roleNames) {

                Role.RoleName roleEnum;

                try {
                    roleEnum = Role.RoleName.valueOf("ROLE_" + roleName.toUpperCase());
                } catch (IllegalArgumentException e) {
                    roleEnum = Role.RoleName.ROLE_USER;
                }

                Role role = roleRepository.findByName(roleEnum).orElse(null);

                if (role == null) {
                    role = createRole(roleEnum, roleEnum.name() + " role");
                }

                roles.add(role);
            }
        }

        return roles;
    }

    private Role createRole(Role.RoleName roleName, String description) {

        Role role = Role.builder()
                .name(roleName)
                .description(description)
                .build();

        return roleRepository.save(role);
    }

    private AuthDto.AuthResponse buildAuthResponse(String token, User user) {

        Set<String> roles = user.getRoles()
                .stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        return AuthDto.AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(roles)
                .build();
    }
}