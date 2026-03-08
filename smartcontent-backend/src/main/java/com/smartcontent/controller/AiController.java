package com.smartcontent.controller;

import com.smartcontent.dto.AiMetadataDto;
import com.smartcontent.dto.ApiResponse;
import com.smartcontent.service.AiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "AI Features", description = "AI-powered content analysis APIs")
public class AiController {

    private final AiService aiService;

    @PostMapping("/summarize")
    @Operation(summary = "Generate AI summary for content", description = "Mock AI implementation")
    public ResponseEntity<ApiResponse<AiMetadataDto.SummarizationResponse>> generateSummary(
            @RequestBody Map<String, String> request) {
        
        String content = request.get("content");
        AiMetadataDto.SummarizationResponse response = aiService.generateSummary(content);
        ApiResponse<AiMetadataDto.SummarizationResponse> apiResponse = 
                ApiResponse.success(response, "Summary generated successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/generate-tags")
    @Operation(summary = "Generate AI tags for content", description = "Mock AI implementation")
    public ResponseEntity<ApiResponse<AiMetadataDto.TagGenerationResponse>> generateTags(
            @RequestBody Map<String, String> request) {
        
        String title = request.get("title");
        String content = request.get("content");
        AiMetadataDto.TagGenerationResponse response = aiService.generateTags(title, content);
        ApiResponse<AiMetadataDto.TagGenerationResponse> apiResponse = 
                ApiResponse.success(response, "Tags generated successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/seo-score")
    @Operation(summary = "Calculate SEO score", description = "Mock AI implementation")
    public ResponseEntity<ApiResponse<AiMetadataDto.SeoScoreResponse>> calculateSeoScore(
            @RequestBody Map<String, String> request) {
        
        String title = request.get("title");
        String content = request.get("content");
        AiMetadataDto.SeoScoreResponse response = aiService.calculateSeoScore(title, content);
        ApiResponse<AiMetadataDto.SeoScoreResponse> apiResponse = 
                ApiResponse.success(response, "SEO score calculated successfully");
        
        return ResponseEntity.ok(apiResponse);
    }
}
