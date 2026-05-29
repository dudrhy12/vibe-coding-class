package com.specbook.portfolio;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioRepository repo;

    public PortfolioService(PortfolioRepository repo) {
        this.repo = repo;
    }

    public List<PortfolioDto.Response> findAll() {
        return repo.findAllByOrderByStartDateDesc()
                .stream()
                .map(PortfolioDto.Response::from)
                .toList();
    }

    public PortfolioDto.Response create(PortfolioDto.CreateRequest req) {
        if (req.getName() == null || req.getName().isBlank())
            throw new IllegalArgumentException("name is required");
        PortfolioItem item = new PortfolioItem();
        item.setName(req.getName());
        item.setStartDate(req.getStartDate());
        item.setEndDate(req.getEndDate());
        item.setTechs(req.getTechs() != null ? req.getTechs() : List.of());
        item.setDescription(req.getDescription());
        item.setLinkUrl(req.getLinkUrl());
        return PortfolioDto.Response.from(repo.save(item));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new EntityNotFoundException("PortfolioItem not found: " + id);
        repo.deleteById(id);
    }
}
