package com.specbook.job;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService {
    private final JobRepository repo;

    public JobService(JobRepository repo) { this.repo = repo; }

    public List<Job> findAll() { return repo.findAll(); }

    public Job create(JobDto dto) {
        if (dto.getCompany() == null || dto.getCompany().isBlank()) throw new IllegalArgumentException("company is required");
        if (dto.getRole() == null || dto.getRole().isBlank()) throw new IllegalArgumentException("role is required");
        if (dto.getDeadline() == null) throw new IllegalArgumentException("deadline is required");
        Job job = new Job();
        job.setCompany(dto.getCompany());
        job.setRole(dto.getRole());
        job.setDeadline(dto.getDeadline());
        job.setPostingUrl(dto.getPostingUrl());
        job.setMemo(dto.getMemo());
        return repo.save(job);
    }

    public Job updateStage(Long id, JobStage stage) {
        Job job = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Job not found: " + id));
        job.setStage(stage);
        return repo.save(job);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new EntityNotFoundException("Job not found: " + id);
        repo.deleteById(id);
    }
}
