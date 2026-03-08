package com.smartcontent.repository;

import com.smartcontent.entity.AiMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AiMetadataRepository extends JpaRepository<AiMetadata, Long> {

    Optional<AiMetadata> findByArticleId(Long articleId);

    Boolean existsByArticleId(Long articleId);
}
