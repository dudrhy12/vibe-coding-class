package com.specbook.resume;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface AiCallLogRepository extends JpaRepository<AiCallLog, Long> {
    Optional<AiCallLog> findByCallDate(LocalDate callDate);
}
