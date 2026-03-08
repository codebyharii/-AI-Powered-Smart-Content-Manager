package com.smartcontent.util;

import com.smartcontent.dto.ArticleDto;
import com.smartcontent.dto.TagDto;
import com.smartcontent.entity.Article;
import com.smartcontent.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ArticleMapper {

    @Mapping(target = "author.id", source = "author.id")
    @Mapping(target = "author.username", source = "author.username")
    @Mapping(target = "author.fullName", source = "author.fullName")
    ArticleDto.Response toResponse(Article article);

    @Mapping(target = "authorName", source = "author.username")
    @Mapping(target = "tagCount", expression = "java(article.getTags().size())")
    ArticleDto.Summary toSummary(Article article);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "aiMetadata", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "publishedAt", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    Article toEntity(ArticleDto.CreateRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "aiMetadata", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "publishedAt", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    void updateEntity(ArticleDto.UpdateRequest request, @MappingTarget Article article);

    TagDto.Response tagToResponse(Tag tag);

    default Set<TagDto.Response> tagsToResponses(Set<Tag> tags) {
        if (tags == null) return null;
        return tags.stream()
                .map(this::tagToResponse)
                .collect(Collectors.toSet());
    }
}
