package com.specbook.resume;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ai_call_log")
public class AiCallLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate callDate;

    @Column(nullable = false)
    private int callCount = 0;

    public AiCallLog() {}

    public AiCallLog(LocalDate callDate) {
        this.callDate = callDate;
        this.callCount = 0;
    }

    public Long getId() { return id; }
    public LocalDate getCallDate() { return callDate; }
    public int getCallCount() { return callCount; }
    public void setCallCount(int callCount) { this.callCount = callCount; }
    public void increment() { this.callCount++; }
}
