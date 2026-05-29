package com.specbook.resume;

import java.time.LocalDateTime;

public class ResumeDto {

    public static class CreateRequest {
        private String title;
        private String content;
        private int charLimit = 500;
        private String company;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public int getCharLimit() { return charLimit; }
        public void setCharLimit(int charLimit) { this.charLimit = charLimit; }
        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }
    }

    public static class UpdateRequest {
        private String title;
        private String content;
        private int charLimit = 500;
        private String company;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public int getCharLimit() { return charLimit; }
        public void setCharLimit(int charLimit) { this.charLimit = charLimit; }
        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }
    }

    public static class Response {
        private Long id;
        private String title;
        private String content;
        private int charLimit;
        private String company;
        private int contentLength;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static Response from(Resume r) {
            Response res = new Response();
            res.id = r.getId();
            res.title = r.getTitle();
            res.content = r.getContent();
            res.charLimit = r.getCharLimit();
            res.company = r.getCompany();
            res.contentLength = r.getContent() != null ? r.getContent().length() : 0;
            res.createdAt = r.getCreatedAt();
            res.updatedAt = r.getUpdatedAt();
            return res;
        }

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getContent() { return content; }
        public int getCharLimit() { return charLimit; }
        public String getCompany() { return company; }
        public int getContentLength() { return contentLength; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
    }
}
