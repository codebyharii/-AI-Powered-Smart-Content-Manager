package com.smartcontent.service;

import com.smartcontent.dto.ArticleDto;
import com.smartcontent.dto.PageResponse;
import com.smartcontent.entity.Article;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface ArticleService {

    ArticleDto.Response createArticle(ArticleDto.CreateRequest request);

    ArticleDto.Response updateArticle(Long id, ArticleDto.UpdateRequest request);

    void deleteArticle(Long id);

    ArticleDto.Response getArticleById(Long id);

    PageResponse<ArticleDto.Summary> getAllArticles(Pageable pageable);

    PageResponse<ArticleDto.Summary> searchArticlesByTitle(String title, Pageable pageable);

    PageResponse<ArticleDto.Summary> getArticlesByTags(Set<String> tags, Pageable pageable);

    PageResponse<ArticleDto.Summary> getArticlesByStatus(Article.ArticleStatus status, Pageable pageable);

    PageResponse<ArticleDto.Summary> getMyArticles(Pageable pageable);
}
