package com.smartcontent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SmartContentApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartContentApplication.class, args);
    }
}
