package com.specbook.job;

import java.time.LocalDate;

public class JobDto {
    private String company;
    private String role;
    private LocalDate deadline;
    private String postingUrl;
    private String memo;
    private JobStage stage;

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
    public String getPostingUrl() { return postingUrl; }
    public void setPostingUrl(String postingUrl) { this.postingUrl = postingUrl; }
    public String getMemo() { return memo; }
    public void setMemo(String memo) { this.memo = memo; }
    public JobStage getStage() { return stage; }
    public void setStage(JobStage stage) { this.stage = stage; }
}
