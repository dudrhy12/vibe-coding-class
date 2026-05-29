package com.specbook.portfolio;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "portfolio_items")
public class PortfolioItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private LocalDate startDate;
    private LocalDate endDate;

    @ElementCollection
    @CollectionTable(name = "portfolio_techs", joinColumns = @JoinColumn(name = "item_id"))
    @Column(name = "tech")
    private List<String> techs = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String description;

    private String linkUrl;

    public PortfolioItem() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public List<String> getTechs() { return techs; }
    public void setTechs(List<String> techs) { this.techs = techs; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLinkUrl() { return linkUrl; }
    public void setLinkUrl(String linkUrl) { this.linkUrl = linkUrl; }
}
