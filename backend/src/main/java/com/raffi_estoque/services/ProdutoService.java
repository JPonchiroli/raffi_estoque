package com.raffi_estoque.services;

import com.raffi_estoque.entities.Fornecedor;
import com.raffi_estoque.entities.Produto;
import com.raffi_estoque.repositories.ProdutoRepository;
import com.raffi_estoque.services.exception.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private FornecedorService fornecedorService;

    @Transactional
    public Produto save(Produto produto){
        Integer codFornecedor = produto.getFornecedor().getCodFornecedor();

        Fornecedor fornecedor = fornecedorService.findById(codFornecedor);

        produto.setFornecedor(fornecedor);

        if (produto.getEstoqueAtual() < produto.getEstoqueMinimo()) {
            throw new EstoqueInsuficienteException("O estoque atual não pode ser menor do que o estoque mínimo");
        }

        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto findById(Integer id){
        Optional<Produto> produto = produtoRepository.findById(id);
        return produto.orElseThrow(() -> new ObjectNotFoundException("Produto Não Encontrado"));
    }

    @Transactional
    public List<Produto> findAll(){
        return produtoRepository.findAll();
    }

    @Transactional
    public Produto update(Integer id, Produto produto){
        Produto produtoUpd = findById(id);
        produtoUpd.setCodigoBarras(produto.getCodigoBarras());
        produtoUpd.setNomeProduto(produto.getNomeProduto());
        produtoUpd.setUnidadeMedida(produto.getUnidadeMedida());
        produtoUpd.setValorCusto(produto.getValorCusto());
        produtoUpd.setPorcentagemLucro(produto.getPorcentagemLucro());
        produtoUpd.setValorVenda(produto.getValorVenda());
        produtoUpd.setEstoqueAtual(produto.getEstoqueAtual());
        produtoUpd.setEstoqueMinimo(produto.getEstoqueMinimo());
        return produtoRepository.save(produtoUpd);
    }

    @Transactional
    public void deleteById(Integer id) {
        Optional<Produto> event = Optional.ofNullable(produtoRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Produto Não Encontrado")));

        produtoRepository.deleteById(id);
    }

    public List<Produto> findFornecedorPorNome(String nomeProduto) {
        return produtoRepository.findByNomeProdutoContainingIgnoreCase(nomeProduto);
    }

    public List<Produto> findFornecedorPorCodigoBarra(String codigoBarras) {
        return produtoRepository.findByCodigoBarrasContaining(codigoBarras);
    }
}
