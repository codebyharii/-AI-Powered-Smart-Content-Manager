package com.smartcontent.service;

import com.smartcontent.dto.AiMetadataDto;

public interface AiService {

    AiMetadataDto.SummarizationResponse generateSummary(String content);

    AiMetadataDto.TagGenerationResponse generateTags(String title, String content);

    AiMetadataDto.SeoScoreResponse calculateSeoScore(String title, String content);
}
