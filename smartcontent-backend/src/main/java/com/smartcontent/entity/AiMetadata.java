package com.smartcontent.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_metadata")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class AiMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(name = "auto_summary", columnDefinition = "TEXT")
    private String autoSummary;

    @Column(name = "generated_tags", length = 500)
    private String generatedTags;

    @Column(name = "seo_score")
    private Integer seoScore;

    @Column(name = "seo_suggestions", columnDefinition = "TEXT")
    private String seoSuggestions;

    @Column(name = "readability_score")
    private Double readabilityScore;

    @Column(name = "word_count")
    private Integer wordCount;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
