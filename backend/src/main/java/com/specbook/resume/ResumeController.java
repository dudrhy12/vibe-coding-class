package com.specbook.resume;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
    private final ResumeService service;

    public ResumeController(ResumeService service) {
        this.service = service;
    }

    @GetMapping
    public List<ResumeDto.Response> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResumeDto.Response getOne(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ResumeDto.Response> create(@RequestBody ResumeDto.CreateRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @PutMapping("/{id}")
    public ResumeDto.Response update(@PathVariable Long id, @RequestBody ResumeDto.UpdateRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/review")
    public ResponseEntity<?> review(@PathVariable Long id) {
        try {
            Map<String, String> result = service.review(id);
            return ResponseEntity.ok(result);
        } catch (AIReviewService.DailyLimitExceededException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "DAILY_LIMIT_EXCEEDED", "message", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "BAD_REQUEST", "message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "SERVER_ERROR", "message", e.getMessage()));
        }
    }
}
