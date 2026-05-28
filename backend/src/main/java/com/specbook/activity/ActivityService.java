package com.specbook.activity;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActivityService {
    private final ActivityRepository repo;

    public ActivityService(ActivityRepository repo) { this.repo = repo; }

    public List<Activity> findAll() { return repo.findAll(); }

    public Activity create(ActivityDto dto) {
        if (dto.getName() == null || dto.getName().isBlank()) throw new IllegalArgumentException("name is required");
        Activity activity = new Activity();
        activity.setName(dto.getName());
        activity.setRole(dto.getRole());
        activity.setStartDate(dto.getStartDate());
        activity.setEndDate(dto.getEndDate());
        activity.setDescription(dto.getDescription());
        activity.setTags(dto.getTags());
        return repo.save(activity);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new EntityNotFoundException("Activity not found: " + id);
        repo.deleteById(id);
    }
}
