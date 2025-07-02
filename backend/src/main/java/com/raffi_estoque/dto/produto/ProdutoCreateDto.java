package com.raffi_estoque.dto.produto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class ProdutoCreateDto {

    @NotBlank
    private String nomeProduto;

    private Long codigoBarras;

    @NotBlank
    private String unidadeMedida;

    @NotBlank
    @Positive
    private Double valorCusto;

    @NotBlank
    @Positive
    private Integer porcentagemLucro;

    @NotBlank
    @Positive
    private Double valorVenda;

    @NotBlank
    private Integer estoqueAtual;

    @NotBlank
    private Integer estoqueMinimo;

    @NotBlank
    private Integer codFornecedor;


    public ProdutoCreateDto() {
    }

    public ProdutoCreateDto(String nomeProduto, Long codigoBarras, String unidadeMedida, Double valorCusto, Integer porcentagemLucro, Double valorVenda, Integer estoqueAtual, Integer estoqueMinimo, Integer codFornecedor) {
        this.nomeProduto = nomeProduto;
        this.codigoBarras = codigoBarras;
        this.unidadeMedida = unidadeMedida;
        this.valorCusto = valorCusto;
        this.porcentagemLucro = porcentagemLucro;
        this.valorVenda = valorVenda;
        this.estoqueAtual = estoqueAtual;
        this.estoqueMinimo = estoqueMinimo;
        this.codFornecedor = codFornecedor;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public Long getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(Long codigoBarras) {
        this.codigoBarras = codigoBarras;
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

    public Integer getCodFornecedor() {
        return codFornecedor;
    }

    public void setCodFornecedor(Integer codFornecedor) {
        this.codFornecedor = codFornecedor;
    }

    @Override
    public String toString() {
        return "ProdutoCreateDto{" +
                "nomeProduto='" + nomeProduto + '\'' +
                ", unidadeMedida='" + unidadeMedida + '\'' +
                ", valorCusto=" + valorCusto +
                ", valorVenda=" + valorVenda +
                ", estoqueAtual=" + estoqueAtual +
                ", estoqueMinimo=" + estoqueMinimo +
                '}';
    }
}