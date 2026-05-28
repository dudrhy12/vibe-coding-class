package com.specbook.job;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService service;

    public JobController(JobService service) { this.service = service; }

    @GetMapping
    public List<Job> getAll() { return service.findAll(); }

    @PostMapping
    public ResponseEntity<Job> create(@RequestBody JobDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}/stage")
    public Job updateStage(@PathVariable Long id, @RequestBody Map<String, String> body) {
        JobStage stage = JobStage.valueOf(body.get("stage"));
        return service.updateStage(id, stage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
