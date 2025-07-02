package com.raffi_estoque.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codProduto;
    private Long codigoBarras;
    private String nomeProduto;
    private String unidadeMedida;
    private Double valorCusto;
    private Integer porcentagemLucro;
    private Double valorVenda;
    private Integer estoqueAtual;
    private Integer estoqueMinimo;

    @ManyToOne
    @JoinColumn(name = "codFornecedor", nullable = false)
    private Fornecedor fornecedor;

    public Produto(){}

    public Produto(Integer codProduto, Long codigoBarras, String nomeProduto, String unidadeMedida, Double valorCusto, Integer porcentagemLucro, Double valorVenda, Integer estoqueAtual, Integer estoqueMinimo, Fornecedor fornecedor) {
        this.codProduto = codProduto;
        this.codigoBarras = codigoBarras;
        this.nomeProduto = nomeProduto;
        this.unidadeMedida = unidadeMedida;
        this.valorCusto = valorCusto;
        this.porcentagemLucro = porcentagemLucro;
        this.valorVenda = valorVenda;
        this.estoqueAtual = estoqueAtual;
        this.estoqueMinimo = estoqueMinimo;
        this.fornecedor = fornecedor;
    }

    public Integer getCodProduto() {
        return codProduto;
    }

    public void setCodProduto(Integer codProduto) {
        this.codProduto = codProduto;
    }

    public Long getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(Long codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Double getValorCusto() {
        return valorCusto;
    }

    public void setValorCusto(Double valorCusto) {
        this.valorCusto = valorCusto;
    }

    public Integer getPorcentagemLucro() {
        return porcentagemLucro;
    }

    public void setPorcentagemLucro(Integer porcentagemLucro) {
        this.porcentagemLucro = porcentagemLucro;
    }

    public Double getValorVenda() {
        return valorVenda;
    }

    public void setValorVenda(Double valorVenda) {
        this.valorVenda = valorVenda;
    }

    public Integer getEstoqueAtual() {
        return estoqueAtual;
    }

    public void setEstoqueAtual(Integer estoqueAtual) {
        this.estoqueAtual = estoqueAtual;
    }

    public Integer getEstoqueMinimo() {
        return estoqueMinimo;
    }

    public void setEstoqueMinimo(Integer estoqueMinimo) {
        this.estoqueMinimo = estoqueMinimo;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }
}
