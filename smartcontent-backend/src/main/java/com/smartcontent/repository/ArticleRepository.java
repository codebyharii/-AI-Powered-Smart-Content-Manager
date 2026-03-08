package com.smartcontent.repository;

import com.smartcontent.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("SELECT a FROM Article a WHERE a.isDeleted = false")
    Page<Article> findAllNotDeleted(Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.id = :id AND a.isDeleted = false")
    Optional<Article> findByIdAndNotDeleted(@Param("id") Long id);

    @Query("SELECT a FROM Article a WHERE a.author.id = :authorId AND a.isDeleted = false")
    Page<Article> findByAuthorIdAndNotDeleted(@Param("authorId") Long authorId, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :title, '%')) AND a.isDeleted = false")
    Page<Article> searchByTitle(@Param("title") String title, Pageable pageable);

    @Query("SELECT DISTINCT a FROM Article a JOIN a.tags t WHERE t.name IN :tagNames AND a.isDeleted = false")
    Page<Article> findByTagsIn(@Param("tagNames") java.util.Set<String> tagNames, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.status = :status AND a.isDeleted = false")
    Page<Article> findByStatus(@Param("status") Article.ArticleStatus status, Pageable pageable);

    @Query("SELECT COUNT(a) FROM Article a WHERE a.author.id = :authorId AND a.isDeleted = false")
    Long countByAuthorId(@Param("authorId") Long authorId);
}
