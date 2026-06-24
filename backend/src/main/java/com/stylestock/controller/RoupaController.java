package com.stylestock.controller;

import com.stylestock.entity.Roupa;
import com.stylestock.service.RoupaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/roupas")
public class RoupaController {

    private final RoupaService roupaService;

    public RoupaController(RoupaService roupaService) {
        this.roupaService = roupaService;
    }

    @GetMapping
    public List<Roupa> listarTodas() {
        return roupaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roupa> buscarPorId(@PathVariable Long id) {
        return roupaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public List<Roupa> buscarPorNome(@RequestParam String nome) {
        return roupaService.buscarPorNome(nome);
    }

    @PostMapping
    public ResponseEntity<Roupa> cadastrar(@Valid @RequestBody Roupa roupa) {
        Roupa novaRoupa = roupaService.cadastrar(roupa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaRoupa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Roupa> atualizar(@Valid @PathVariable Long id, @RequestBody Roupa roupa) {
        return roupaService.atualizar(id, roupa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (roupaService.excluir(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
