package com.raffi_estoque.services;

import com.raffi_estoque.dto.venda.ItemVendaCreateDto;
import com.raffi_estoque.dto.venda.VendaCreateDto;
import com.raffi_estoque.entities.*;
import com.raffi_estoque.repositories.ClienteRepository;
import com.raffi_estoque.repositories.ItemVendaRepository;
import com.raffi_estoque.repositories.ProdutoRepository;
import com.raffi_estoque.repositories.VendaRepository;
import com.raffi_estoque.services.exception.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VendaService {
    
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    @Autowired
    private ProdutoService produtoService;

    @Transactional
    public Venda salvarVenda(VendaCreateDto dto) {
        Venda venda = new Venda();

        Usuario usuario = new Usuario(dto.getCodUsuario());

        Cliente cliente = clienteRepository.findById(dto.getCodCliente())
                .orElseThrow(() -> new ProdutoNaoEncontradoException("Cliente com código " + dto.getCodCliente() + " não encontrado"));

        venda.setCodCliente(cliente.getCodCliente());
        venda.setDataVenda(LocalDateTime.now());
        venda.setUsuario(usuario);

        double totalVenda = 0.0;
        List<ItemVenda> itens = new ArrayList<>();

        for (ItemVendaCreateDto itemDto : dto.getItens()) {
            Produto produto = produtoRepository.findById(itemDto.getCodProduto())
                    .orElseThrow(() -> new ProdutoNaoEncontradoException("Produto com código " + itemDto.getCodProduto() + " não encontrado"));

            int novaQuantidade = produto.getEstoqueAtual() - itemDto.getQuantidade();

            if (novaQuantidade < 0) {
                throw new EstoqueInsuficienteException("O estoque atual não pode ser menor 0 após uma venda");
            }

            produto.setEstoqueAtual(novaQuantidade);
            produtoService.update(produto.getCodProduto(), produto);

            ItemVenda item = new ItemVenda();
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setVenda(venda);

            totalVenda += produto.getValorVenda() * itemDto.getQuantidade();
            itens.add(item);
        }

        venda.setItens(itens);
        venda.setValorTotal(totalVenda);

        return vendaRepository.save(venda);
    }

    @Transactional
    public Venda findById(Integer id){
        Optional<Venda> event = vendaRepository.findById(id);
        return event.orElseThrow(() -> new ObjectNotFoundException("Venda Não Encontrada"));
    }

    @Transactional
    public List<Venda> findAll(){
        return vendaRepository.findAll();
    }
    
    @Transactional
    public void update(Integer id, Venda venda){}

    @Transactional
    public void deleteById(Integer id) {
        Optional<Venda> venda = vendaRepository.findById(id);

        if (venda.isEmpty()) {
            throw new  VendaNaoEncontradaException("Venda Não Encontrada");
        }

        List<ItemVenda> itens = venda.get().getItens();

        for (ItemVenda item: itens) {
            int codProduto = item.getProduto().getCodProduto();

            Produto produto = produtoService.findById(codProduto);

            produto.setEstoqueAtual(produto.getEstoqueAtual() + item.getQuantidade());

            produtoService.update(codProduto, produto);
        }

        vendaRepository.deleteById(id);
    }

    public List<ItemVenda> findItensVendaByVendaId(int codVenda) {
        List<ItemVenda> itens = itemVendaRepository.findByVendaCodVenda(codVenda);
        if (itens.isEmpty()) {
            throw new ObjectNotFoundException("Nenhum item encontrado para a venda " + codVenda);
        }
        return itens;
    }
}
