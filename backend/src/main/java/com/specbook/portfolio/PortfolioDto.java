package com.specbook.portfolio;

import java.time.LocalDate;
import java.util.List;

public class PortfolioDto {

    public static class CreateRequest {
        private String name;
        private LocalDate startDate;
        private LocalDate endDate;
        private List<String> techs;
        private String description;
        private String linkUrl;

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

    public static class Response {
        private Long id;
        private String name;
        private LocalDate startDate;
        private LocalDate endDate;
        private List<String> techs;
        private String description;
        private String linkUrl;

        public static Response from(PortfolioItem item) {
            Response res = new Response();
            res.id = item.getId();
            res.name = item.getName();
            res.startDate = item.getStartDate();
            res.endDate = item.getEndDate();
            res.techs = item.getTechs();
            res.description = item.getDescription();
            res.linkUrl = item.getLinkUrl();
            return res;
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public LocalDate getStartDate() { return startDate; }
        public LocalDate getEndDate() { return endDate; }
        public List<String> getTechs() { return techs; }
        public String getDescription() { return description; }
        public String getLinkUrl() { return linkUrl; }
    }
}
