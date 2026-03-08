package com.smartcontent.service.impl;

import com.smartcontent.dto.AiMetadataDto;
import com.smartcontent.service.AiService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
public class AiServiceImpl implements AiService {

    @Value("${app.ai.mock-delay-ms:500}")
    private int mockDelayMs;

    @Value("${app.ai.summarization.max-length:200}")
    private int maxSummaryLength;

    @Value("${app.ai.tagging.max-tags:5}")
    private int maxTags;

    private final Random random = new Random();

    @Override
    public AiMetadataDto.SummarizationResponse generateSummary(String content) {
        log.info("Generating AI summary for content of length: {}", content.length());
        simulateAiProcessing();

        String summary = createSummary(content);
        int wordCount = content.split("\\s+").length;

        return AiMetadataDto.SummarizationResponse.builder()
                .summary(summary)
                .wordCount(wordCount)
                .summaryLength(summary.length())
                .compressionRatio((double) summary.length() / content.length())
                .build();
    }

    @Override
    public AiMetadataDto.TagGenerationResponse generateTags(String title, String content) {
        log.info("Generating AI tags for title: {}", title);
        simulateAiProcessing();

        List<String> tags = extractTags(title, content);
        String confidence = tags.size() >= 3 ? "HIGH" : tags.size() >= 2 ? "MEDIUM" : "LOW";

        return AiMetadataDto.TagGenerationResponse.builder()
                .tags(tags)
                .tagCount(tags.size())
                .confidence(confidence)
                .build();
    }

    @Override
    public AiMetadataDto.SeoScoreResponse calculateSeoScore(String title, String content) {
        log.info("Calculating SEO score");
        simulateAiProcessing();

        AiMetadataDto.SeoMetrics metrics = calculateMetrics(title, content);
        int score = computeSeoScore(metrics);
        String rating = getRating(score);
        List<String> suggestions = generateSuggestions(metrics, score);

        return AiMetadataDto.SeoScoreResponse.builder()
                .score(score)
                .rating(rating)
                .suggestions(suggestions)
                .metrics(metrics)
                .build();
    }

    private void simulateAiProcessing() {
        try {
            Thread.sleep(mockDelayMs);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private String createSummary(String content) {
        String[] sentences = content.split("\\. ");
        if (sentences.length == 0) return content;

        StringBuilder summary = new StringBuilder();
        int currentLength = 0;

        for (String sentence : sentences) {
            if (currentLength + sentence.length() > maxSummaryLength) {
                break;
            }
            summary.append(sentence).append(". ");
            currentLength += sentence.length();
        }

        String result = summary.toString().trim();
        return result.isEmpty() ? content.substring(0, Math.min(maxSummaryLength, content.length())) : result;
    }

    private List<String> extractTags(String title, String content) {
        List<String> tags = new ArrayList<>();
        String combinedText = (title + " " + content).toLowerCase();

        String[] commonTechTerms = {
                "java", "spring", "boot", "api", "rest", "microservice",
                "database", "sql", "nosql", "cloud", "aws", "azure",
                "docker", "kubernetes", "ai", "machine learning", "python",
                "javascript", "react", "angular", "vue", "nodejs",
                "security", "authentication", "testing", "devops"
        };

        for (String term : commonTechTerms) {
            if (combinedText.contains(term) && tags.size() < maxTags) {
                tags.add(term.substring(0, 1).toUpperCase() + term.substring(1));
            }
        }

        while (tags.size() < 2) {
            tags.add("Content-" + (tags.size() + 1));
        }

        return tags;
    }

    private AiMetadataDto.SeoMetrics calculateMetrics(String title, String content) {
        int titleLength = title.length();
        int contentLength = content.length();
        int wordCount = content.split("\\s+").length;
        int keywordDensity = calculateKeywordDensity(title, content);
        int readabilityScore = 60 + random.nextInt(30);

        return AiMetadataDto.SeoMetrics.builder()
                .titleLength(titleLength)
                .contentLength(contentLength)
                .keywordDensity(keywordDensity)
                .hasMetaDescription(contentLength > 100)
                .readabilityScore(readabilityScore)
                .build();
    }

    private int calculateKeywordDensity(String title, String content) {
        String[] titleWords = title.toLowerCase().split("\\s+");
        String contentLower = content.toLowerCase();
        int matches = 0;

        for (String word : titleWords) {
            if (word.length() > 3) {
                matches += countOccurrences(contentLower, word);
            }
        }

        return Math.min(100, matches * 2);
    }

    private int countOccurrences(String text, String word) {
        int count = 0;
        int index = 0;
        while ((index = text.indexOf(word, index)) != -1) {
            count++;
            index += word.length();
        }
        return count;
    }

    private int computeSeoScore(AiMetadataDto.SeoMetrics metrics) {
        int score = 0;

        if (metrics.getTitleLength() >= 30 && metrics.getTitleLength() <= 60) {
            score += 20;
        } else if (metrics.getTitleLength() >= 20 && metrics.getTitleLength() <= 80) {
            score += 10;
        }

        if (metrics.getContentLength() >= 300) {
            score += 25;
        } else if (metrics.getContentLength() >= 150) {
            score += 15;
        }

        if (metrics.getKeywordDensity() >= 20 && metrics.getKeywordDensity() <= 50) {
            score += 20;
        } else if (metrics.getKeywordDensity() > 0) {
            score += 10;
        }

        if (metrics.getHasMetaDescription()) {
            score += 15;
        }

        score += Math.min(20, metrics.getReadabilityScore() / 5);

        return Math.min(100, score);
    }

    private String getRating(int score) {
        if (score >= 80) return "EXCELLENT";
        if (score >= 60) return "GOOD";
        if (score >= 40) return "AVERAGE";
        if (score >= 20) return "POOR";
        return "NEEDS_IMPROVEMENT";
    }

    private List<String> generateSuggestions(AiMetadataDto.SeoMetrics metrics, int score) {
        List<String> suggestions = new ArrayList<>();

        if (metrics.getTitleLength() < 30) {
            suggestions.add("Consider making your title longer (30-60 characters optimal)");
        } else if (metrics.getTitleLength() > 80) {
            suggestions.add("Your title might be too long, try keeping it under 60 characters");
        }

        if (metrics.getContentLength() < 300) {
            suggestions.add("Add more content. Articles with 300+ words tend to rank better");
        }

        if (metrics.getKeywordDensity() < 20) {
            suggestions.add("Include more relevant keywords from your title in the content");
        } else if (metrics.getKeywordDensity() > 50) {
            suggestions.add("Keyword density seems high, ensure content reads naturally");
        }

        if (!metrics.getHasMetaDescription()) {
            suggestions.add("Add a meta description (summary) to improve SEO");
        }

        if (metrics.getReadabilityScore() < 60) {
            suggestions.add("Improve readability by using shorter sentences and simpler words");
        }

        if (suggestions.isEmpty()) {
            suggestions.add("Great job! Your content is well-optimized for SEO");
        }

        return suggestions;
    }
}
