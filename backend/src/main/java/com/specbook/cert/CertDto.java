package com.specbook.cert;

import java.time.LocalDate;

public class CertDto {
    private String name;
    private String score;
    private LocalDate issuedAt;
    private LocalDate expiresAt;
    private String issuer;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getScore() { return score; }
    public void setScore(String score) { this.score = score; }
    public LocalDate getIssuedAt() { return issuedAt; }
    public void setIssuedAt(LocalDate issuedAt) { this.issuedAt = issuedAt; }
    public LocalDate getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDate expiresAt) { this.expiresAt = expiresAt; }
    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }
}
