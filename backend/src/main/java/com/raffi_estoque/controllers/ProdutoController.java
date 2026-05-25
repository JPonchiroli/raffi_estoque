package com.raffi_estoque.controllers;

import com.raffi_estoque.dto.produto.*;
import com.raffi_estoque.entities.Fornecedor;
import com.raffi_estoque.entities.Produto;
import com.raffi_estoque.mapper.ProdutoMapper;
import com.raffi_estoque.services.ProdutoService;
import com.raffi_estoque.services.exception.FornecedorNuloException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private ProdutoMapper mapper;

    @PostMapping("/create-produto")
    public ResponseEntity<ProdutoResponseDto> createEvent(@RequestBody ProdutoCreateDto produto) {
        Produto produtoCreated = mapper.toProduto(produto);

        if (produto.getCodFornecedor() != null) {
            Fornecedor fornecedor = new Fornecedor();
            fornecedor.setCodFornecedor(produto.getCodFornecedor());
            produtoCreated.setFornecedor(fornecedor);
        } else {
            throw new FornecedorNuloException("O cadastro de um fornecedor é obrigatório.");
        }

        produtoService.save(produtoCreated);
        return ResponseEntity.status(201).body(mapper.toProdutoResponseDto(produtoCreated));
    }

    @GetMapping("/get-produto/{id}")
    public ResponseEntity<ProdutoResponseDto> findById(@PathVariable("id") Integer id){
        Produto produto = produtoService.findById(id);
        return ResponseEntity.ok().body(mapper.toProdutoResponseDto(produto));
    }

    @GetMapping("/get-all-produtos")
    public ResponseEntity<List<ProdutoResponseDto>> findAll(){
        List<Produto> produtos = produtoService.findAll();
        return ResponseEntity.ok().body(mapper.toListResponseDto(produtos));
    }

    @PutMapping("/update-produto/{id}")
    public ResponseEntity<ProdutoUpdateDto> updateEvent(@PathVariable Integer id, @RequestBody ProdutoUpdateDto updateDto){
        Produto produto = produtoService.update(id, mapper.toProduto(updateDto));
        return ResponseEntity.ok(mapper.toUpdate(produto));
    }

    @DeleteMapping("/deletar-produto/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable("id") Integer id){
        produtoService.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get-produto-nome/{nomeProduto}")
    public List<ProdutoNomeDto> getProdutoPorNome(@PathVariable String nomeProduto) {
        List<Produto> produtos = produtoService.findFornecedorPorNome(nomeProduto);
        return produtos.stream()
                .map(f -> new ProdutoNomeDto(f.getCodProduto(), f.getNomeProduto(), f.getValorVenda()))
                .collect(Collectors.toList());
    }

    @GetMapping("/get-produto-cod-barras/{codigoBarras}")
    public List<ProdutoCodigoBarraDto> getProdutoPorCodigoBarras(@PathVariable String codigoBarras) {
        List<Produto> produtos = produtoService.findFornecedorPorCodigoBarra(codigoBarras);
        return produtos.stream()
                .map(f -> new ProdutoCodigoBarraDto(f.getCodProduto(), f.getCodigoBarras(), f.getNomeProduto()))
                .collect(Collectors.toList());
    }
}