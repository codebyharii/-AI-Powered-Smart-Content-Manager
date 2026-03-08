package com.smartcontent.controller;

import com.smartcontent.dto.ApiResponse;
import com.smartcontent.dto.ArticleDto;
import com.smartcontent.dto.PageResponse;
import com.smartcontent.entity.Article;
import com.smartcontent.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@Tag(name = "Articles", description = "Article management APIs")
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create a new article", description = "Requires AUTHOR or ADMIN role")
    public ResponseEntity<ApiResponse<ArticleDto.Response>> createArticle(
            @Valid @RequestBody ArticleDto.CreateRequest request) {
        
        ArticleDto.Response response = articleService.createArticle(request);
        ApiResponse<ArticleDto.Response> apiResponse = 
                ApiResponse.success(response, "Article created successfully");
        
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update an article", description = "Requires AUTHOR or ADMIN role")
    public ResponseEntity<ApiResponse<ArticleDto.Response>> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleDto.UpdateRequest request) {
        
        ArticleDto.Response response = articleService.updateArticle(id, request);
        ApiResponse<ArticleDto.Response> apiResponse = 
                ApiResponse.success(response, "Article updated successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete an article", description = "Requires AUTHOR or ADMIN role")
    public ResponseEntity<ApiResponse<Void>> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        ApiResponse<Void> apiResponse = 
                ApiResponse.success(null, "Article deleted successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get article by ID")
    public ResponseEntity<ApiResponse<ArticleDto.Response>> getArticleById(@PathVariable Long id) {
        ArticleDto.Response response = articleService.getArticleById(id);
        ApiResponse<ArticleDto.Response> apiResponse = 
                ApiResponse.success(response, "Article retrieved successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    @Operation(summary = "Get all articles with pagination and sorting")
    public ResponseEntity<ApiResponse<PageResponse<ArticleDto.Summary>>> getAllArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? 
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PageResponse<ArticleDto.Summary> response = articleService.getAllArticles(pageable);
        ApiResponse<PageResponse<ArticleDto.Summary>> apiResponse = 
                ApiResponse.success(response, "Articles retrieved successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/search")
    @Operation(summary = "Search articles by title")
    public ResponseEntity<ApiResponse<PageResponse<ArticleDto.Summary>>> searchArticles(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<ArticleDto.Summary> response = articleService.searchArticlesByTitle(title, pageable);
        ApiResponse<PageResponse<ArticleDto.Summary>> apiResponse = 
                ApiResponse.success(response, "Search completed successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/filter/tags")
    @Operation(summary = "Filter articles by tags")
    public ResponseEntity<ApiResponse<PageResponse<ArticleDto.Summary>>> getArticlesByTags(
            @RequestParam Set<String> tags,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<ArticleDto.Summary> response = articleService.getArticlesByTags(tags, pageable);
        ApiResponse<PageResponse<ArticleDto.Summary>> apiResponse = 
                ApiResponse.success(response, "Articles filtered successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/filter/status")
    @Operation(summary = "Filter articles by status")
    public ResponseEntity<ApiResponse<PageResponse<ArticleDto.Summary>>> getArticlesByStatus(
            @RequestParam Article.ArticleStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PageResponse<ArticleDto.Summary> response = articleService.getArticlesByStatus(status, pageable);
        ApiResponse<PageResponse<ArticleDto.Summary>> apiResponse = 
                ApiResponse.success(response, "Articles filtered successfully");
        
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/my-articles")
    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Get current user's articles")
    public ResponseEntity<ApiResponse<PageResponse<ArticleDto.Summary>>> getMyArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        PageResponse<ArticleDto.Summary> response = articleService.getMyArticles(pageable);
        ApiResponse<PageResponse<ArticleDto.Summary>> apiResponse = 
                ApiResponse.success(response, "Your articles retrieved successfully");
        
        return ResponseEntity.ok(apiResponse);
    }
}
