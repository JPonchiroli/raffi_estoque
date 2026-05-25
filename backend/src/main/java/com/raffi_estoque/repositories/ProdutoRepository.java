package com.raffi_estoque.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.raffi_estoque.entities.Produto;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    List<Produto> findByNomeProdutoContainingIgnoreCase(String nomeProduto);

    List<Produto> findByCodigoBarrasContaining(String codigoBarras);

    @Query("SELECT p FROM Produto p WHERE p.estoqueAtual IS NOT NULL AND p.estoqueMinimo IS NOT NULL AND p.estoqueAtual <= p.estoqueMinimo")
    List<Produto> findProdutosEstoqueBaixo();

    @Query("SELECT COUNT(p) FROM Produto p WHERE p.estoqueAtual IS NOT NULL AND p.estoqueMinimo IS NOT NULL AND p.estoqueAtual <= p.estoqueMinimo")
    Long countProdutosEstoqueBaixo();
}
