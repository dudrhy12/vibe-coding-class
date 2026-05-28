package com.specbook.cert;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/certs")
public class CertController {
    private final CertService service;

    public CertController(CertService service) { this.service = service; }

    @GetMapping
    public List<Cert> getAll() { return service.findAll(); }

    @PostMapping
    public ResponseEntity<Cert> create(@RequestBody CertDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
