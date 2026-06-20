package com.raffi_estoque.controllers;

import com.raffi_estoque.dto.relatorio.*;
import com.raffi_estoque.services.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin(origins = "http://localhost:3000")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/resumo")
    public ResponseEntity<ResumoDto> getResumo() {
        return ResponseEntity.ok(relatorioService.getResumo());
    }

    @GetMapping("/produtos-mais-vendidos")
    public ResponseEntity<List<ProdutoMaisVendidoDto>> getProdutosMaisVendidos() {
        return ResponseEntity.ok(relatorioService.getProdutosMaisVendidos());
    }

    @GetMapping("/faturamento")
    public ResponseEntity<FaturamentoPeriodoDto> getFaturamentoPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        return ResponseEntity.ok(relatorioService.getFaturamentoPorPeriodo(dataInicio, dataFim));
    }

    @GetMapping("/faturamento-mensal")
    public ResponseEntity<List<FaturamentoMensalDto>> getFaturamentoMensal() {
        return ResponseEntity.ok(relatorioService.getFaturamentoMensal());
    }

    @GetMapping("/estoque-baixo")
    public ResponseEntity<List<ProdutoEstoqueBaixoDto>> getEstoqueBaixo() {
        return ResponseEntity.ok(relatorioService.getProdutosEstoqueBaixo());
    }
}
