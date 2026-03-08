package com.smartcontent.dto;

import com.smartcontent.entity.Article;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

public class ArticleDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateRequest {

        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must not exceed 200 characters")
        private String title;

        @NotBlank(message = "Content is required")
        private String content;

        private String summary;

        private Article.ArticleStatus status;

        private Set<String> tags;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateRequest {

        @Size(max = 200, message = "Title must not exceed 200 characters")
        private String title;

        private String content;

        private String summary;

        private Article.ArticleStatus status;

        private Set<String> tags;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private String summary;
        private Article.ArticleStatus status;
        private AuthorInfo author;
        private Set<TagDto.Response> tags;
        private AiMetadataDto.Response aiMetadata;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private LocalDateTime publishedAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AuthorInfo {
        private Long id;
        private String username;
        private String fullName;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Summary {
        private Long id;
        private String title;
        private String summary;
        private Article.ArticleStatus status;
        private String authorName;
        private Integer tagCount;
        private LocalDateTime createdAt;
        private LocalDateTime publishedAt;
    }
}
