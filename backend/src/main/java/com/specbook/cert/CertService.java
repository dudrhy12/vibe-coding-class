package com.specbook.cert;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CertService {
    private final CertRepository repo;

    public CertService(CertRepository repo) { this.repo = repo; }

    public List<Cert> findAll() { return repo.findAll(); }

    public Cert create(CertDto dto) {
        if (dto.getName() == null || dto.getName().isBlank()) throw new IllegalArgumentException("name is required");
        if (dto.getIssuedAt() == null) throw new IllegalArgumentException("issuedAt is required");
        Cert cert = new Cert();
        cert.setName(dto.getName());
        cert.setScore(dto.getScore());
        cert.setIssuedAt(dto.getIssuedAt());
        cert.setExpiresAt(dto.getExpiresAt());
        cert.setIssuer(dto.getIssuer());
        return repo.save(cert);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new jakarta.persistence.EntityNotFoundException("Cert not found: " + id);
        repo.deleteById(id);
    }
}
