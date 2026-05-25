package com.raffi_estoque.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.raffi_estoque.entities.Venda;

import java.time.LocalDateTime;
import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Integer> {

    List<Venda> findByDataVendaBetween(LocalDateTime inicio, LocalDateTime fim);

    @Query("SELECT COALESCE(SUM(v.valorTotal), 0.0) FROM Venda v WHERE v.dataVenda BETWEEN :inicio AND :fim")
    Double somaFaturamentoPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

    @Query("SELECT COUNT(v) FROM Venda v WHERE v.dataVenda BETWEEN :inicio AND :fim")
    Long contarVendasPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
}
