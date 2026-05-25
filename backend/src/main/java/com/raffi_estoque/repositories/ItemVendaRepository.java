package com.raffi_estoque.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.raffi_estoque.entities.ItemVenda;

import java.util.List;

public interface ItemVendaRepository extends JpaRepository<ItemVenda, Integer> {

    List<ItemVenda> findByVendaCodVenda(int codVenda);

    @Query("SELECT iv.produto.codProduto, iv.produto.nomeProduto, SUM(iv.quantidade), " +
           "SUM(COALESCE(iv.produto.valorVenda, 0.0) * iv.quantidade) " +
           "FROM ItemVenda iv " +
           "GROUP BY iv.produto.codProduto, iv.produto.nomeProduto " +
           "ORDER BY SUM(iv.quantidade) DESC")
    List<Object[]> produtosMaisVendidos();
}
