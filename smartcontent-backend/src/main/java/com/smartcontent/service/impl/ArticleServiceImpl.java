package com.smartcontent.service.impl;

import com.smartcontent.dto.ArticleDto;
import com.smartcontent.dto.PageResponse;
import com.smartcontent.entity.AiMetadata;
import com.smartcontent.entity.Article;
import com.smartcontent.entity.Tag;
import com.smartcontent.entity.User;
import com.smartcontent.exception.ResourceNotFoundException;
import com.smartcontent.exception.UnauthorizedException;
import com.smartcontent.repository.ArticleRepository;
import com.smartcontent.repository.TagRepository;
import com.smartcontent.repository.UserRepository;
import com.smartcontent.service.AiService;
import com.smartcontent.service.ArticleService;
import com.smartcontent.util.ArticleMapper;
import com.smartcontent.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final ArticleMapper articleMapper;
    private final AiService aiService;

    @Override
    @Transactional
    public ArticleDto.Response createArticle(ArticleDto.CreateRequest request) {
        String username = SecurityUtil.getCurrentUsername();
        log.info("Creating article for user: {}", username);

        User author = userRepository.findByUsernameOrEmailAndNotDeleted(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Article article = articleMapper.toEntity(request);
        article.setAuthor(author);
        article.setIsDeleted(false);

        if (request.getStatus() == null) {
            article.setStatus(Article.ArticleStatus.DRAFT);
        }

        if (article.getStatus() == Article.ArticleStatus.PUBLISHED) {
            article.setPublishedAt(LocalDateTime.now());
        }

        if (request.getTags() != null && !request.getTags().isEmpty()) {
            Set<Tag> tags = getOrCreateTags(request.getTags());
            tags.forEach(article::addTag);
        }

        Article savedArticle = articleRepository.save(article);

        if (request.getContent() != null && !request.getContent().isEmpty()) {
            generateAndSaveAiMetadata(savedArticle);
        }

        log.info("Article created successfully with ID: {}", savedArticle.getId());
        return articleMapper.toResponse(savedArticle);
    }

    @Override
    @Transactional
    public ArticleDto.Response updateArticle(Long id, ArticleDto.UpdateRequest request) {
        String username = SecurityUtil.getCurrentUsername();
        log.info("Updating article ID: {} by user: {}", id, username);

        Article article = articleRepository.findByIdAndNotDeleted(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));

        User currentUser = userRepository.findByUsernameOrEmailAndNotDeleted(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        boolean isAuthor = article.getAuthor().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));

        if (!isAuthor && !isAdmin) {
            throw new UnauthorizedException("You don't have permission to update this article");
        }

        Article.ArticleStatus oldStatus = article.getStatus();
        articleMapper.updateEntity(request, article);

        if (request.getStatus() != null && 
            request.getStatus() == Article.ArticleStatus.PUBLISHED && 
            oldStatus == Article.ArticleStatus.DRAFT) {
            article.setPublishedAt(LocalDateTime.now());
        }

        if (request.getTags() != null) {
            article.getTags().clear();
            if (!request.getTags().isEmpty()) {
                Set<Tag> tags = getOrCreateTags(request.getTags());
                tags.forEach(article::addTag);
            }
        }

        Article updatedArticle = articleRepository.save(article);

        if (request.getContent() != null && !request.getContent().isEmpty()) {
            generateAndSaveAiMetadata(updatedArticle);
        }

        log.info("Article updated successfully: {}", updatedArticle.getId());
        return articleMapper.toResponse(updatedArticle);
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        String username = SecurityUtil.getCurrentUsername();
        log.info("Deleting article ID: {} by user: {}", id, username);

        Article article = articleRepository.findByIdAndNotDeleted(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));

        User currentUser = userRepository.findByUsernameOrEmailAndNotDeleted(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        boolean isAuthor = article.getAuthor().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));

        if (!isAuthor && !isAdmin) {
            throw new UnauthorizedException("You don't have permission to delete this article");
        }

        article.setIsDeleted(true);
        articleRepository.save(article);
        log.info("Article soft deleted successfully: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public ArticleDto.Response getArticleById(Long id) {
        log.info("Fetching article by ID: {}", id);
        Article article = articleRepository.findByIdAndNotDeleted(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));
        return articleMapper.toResponse(article);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ArticleDto.Summary> getAllArticles(Pageable pageable) {
        log.info("Fetching all articles with pagination");
        Page<Article> articlePage = articleRepository.findAllNotDeleted(pageable);
        return buildPageResponse(articlePage);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ArticleDto.Summary> searchArticlesByTitle(String title, Pageable pageable) {
        log.info("Searching articles by title: {}", title);
        Page<Article> articlePage = articleRepository.searchByTitle(title, pageable);
        return buildPageResponse(articlePage);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ArticleDto.Summary> getArticlesByTags(Set<String> tags, Pageable pageable) {
        log.info("Fetching articles by tags: {}", tags);
        Page<Article> articlePage = articleRepository.findByTagsIn(tags, pageable);
        return buildPageResponse(articlePage);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ArticleDto.Summary> getArticlesByStatus(Article.ArticleStatus status, Pageable pageable) {
        log.info("Fetching articles by status: {}", status);
        Page<Article> articlePage = articleRepository.findByStatus(status, pageable);
        return buildPageResponse(articlePage);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ArticleDto.Summary> getMyArticles(Pageable pageable) {
        String username = SecurityUtil.getCurrentUsername();
        log.info("Fetching articles for user: {}", username);

        User user = userRepository.findByUsernameOrEmailAndNotDeleted(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Page<Article> articlePage = articleRepository.findByAuthorIdAndNotDeleted(user.getId(), pageable);
        return buildPageResponse(articlePage);
    }

    private Set<Tag> getOrCreateTags(Set<String> tagNames) {
        Set<Tag> tags = new HashSet<>();
        
        for (String tagName : tagNames) {
            Tag tag = tagRepository.findByName(tagName)
                    .orElseGet(() -> {
                        Tag newTag = Tag.builder()
                                .name(tagName)
                                .description("Auto-generated tag")
                                .build();
                        return tagRepository.save(newTag);
                    });
            tags.add(tag);
        }
        
        return tags;
    }

    private void generateAndSaveAiMetadata(Article article) {
        try {
            var summaryResponse = aiService.generateSummary(article.getContent());
            var seoResponse = aiService.calculateSeoScore(article.getTitle(), article.getContent());

            AiMetadata metadata = AiMetadata.builder()
                    .article(article)
                    .autoSummary(summaryResponse.getSummary())
                    .seoScore(seoResponse.getScore())
                    .seoSuggestions(String.join("; ", seoResponse.getSuggestions()))
                    .readabilityScore((double) seoResponse.getMetrics().getReadabilityScore())
                    .wordCount(summaryResponse.getWordCount())
                    .build();

            if (article.getAiMetadata() == null) {
                article.setAiMetadata(metadata);
            } else {
                AiMetadata existing = article.getAiMetadata();
                existing.setAutoSummary(metadata.getAutoSummary());
                existing.setSeoScore(metadata.getSeoScore());
                existing.setSeoSuggestions(metadata.getSeoSuggestions());
                existing.setReadabilityScore(metadata.getReadabilityScore());
                existing.setWordCount(metadata.getWordCount());
            }
        } catch (Exception e) {
            log.error("Failed to generate AI metadata for article: {}", article.getId(), e);
        }
    }

    private PageResponse<ArticleDto.Summary> buildPageResponse(Page<Article> articlePage) {
        return PageResponse.<ArticleDto.Summary>builder()
                .content(articlePage.getContent().stream()
                        .map(articleMapper::toSummary)
                        .toList())
                .pageNumber(articlePage.getNumber())
                .pageSize(articlePage.getSize())
                .totalElements(articlePage.getTotalElements())
                .totalPages(articlePage.getTotalPages())
                .last(articlePage.isLast())
                .first(articlePage.isFirst())
                .build();
    }
}
