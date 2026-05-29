package com.specbook.resume;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ResumeService {
    private final ResumeRepository repo;
    private final AIReviewService aiReviewService;

    public ResumeService(ResumeRepository repo, AIReviewService aiReviewService) {
        this.repo = repo;
        this.aiReviewService = aiReviewService;
    }

    public List<ResumeDto.Response> findAll() {
        return repo.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(ResumeDto.Response::from)
                .toList();
    }

    public ResumeDto.Response findById(Long id) {
        return ResumeDto.Response.from(getOrThrow(id));
    }

    public ResumeDto.Response create(ResumeDto.CreateRequest req) {
        if (req.getTitle() == null || req.getTitle().isBlank())
            throw new IllegalArgumentException("title is required");
        Resume resume = new Resume();
        resume.setTitle(req.getTitle());
        resume.setContent(req.getContent() != null ? req.getContent() : "");
        resume.setCharLimit(req.getCharLimit() > 0 ? req.getCharLimit() : 500);
        resume.setCompany(req.getCompany());
        return ResumeDto.Response.from(repo.save(resume));
    }

    @Transactional
    public ResumeDto.Response update(Long id, ResumeDto.UpdateRequest req) {
        Resume resume = getOrThrow(id);
        if (req.getTitle() != null && !req.getTitle().isBlank()) resume.setTitle(req.getTitle());
        if (req.getContent() != null) resume.setContent(req.getContent());
        if (req.getCharLimit() > 0) resume.setCharLimit(req.getCharLimit());
        resume.setCompany(req.getCompany());
        resume.setUpdatedAt(LocalDateTime.now());
        return ResumeDto.Response.from(repo.save(resume));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new EntityNotFoundException("Resume not found: " + id);
        repo.deleteById(id);
    }

    public Map<String, String> review(Long id) throws Exception {
        Resume resume = getOrThrow(id);
        String content = resume.getContent();
        if (content == null || content.isBlank())
            throw new IllegalArgumentException("이력서 내용이 비어 있습니다.");
        return aiReviewService.review(content);
    }

    private Resume getOrThrow(Long id) {
        return repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Resume not found: " + id));
    }
}
