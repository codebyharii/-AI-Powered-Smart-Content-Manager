package com.smartcontent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class AiMetadataDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String autoSummary;
        private String generatedTags;
        private Integer seoScore;
        private String seoSuggestions;
        private Double readabilityScore;
        private Integer wordCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SummarizationResponse {
        private String summary;
        private Integer wordCount;
        private Integer summaryLength;
        private Double compressionRatio;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TagGenerationResponse {
        private List<String> tags;
        private Integer tagCount;
        private String confidence;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SeoScoreResponse {
        private Integer score;
        private String rating;
        private List<String> suggestions;
        private SeoMetrics metrics;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SeoMetrics {
        private Integer titleLength;
        private Integer contentLength;
        private Integer keywordDensity;
        private Boolean hasMetaDescription;
        private Integer readabilityScore;
    }
}
