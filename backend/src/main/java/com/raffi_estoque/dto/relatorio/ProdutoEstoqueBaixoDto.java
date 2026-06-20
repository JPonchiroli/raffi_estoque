package com.raffi_estoque.dto.relatorio;

public class ProdutoEstoqueBaixoDto {

    private Integer codProduto;
    private String nomeProduto;
    private Integer estoqueAtual;
    private Integer estoqueMinimo;

    public Integer getCodProduto() { return codProduto; }
    public void setCodProduto(Integer codProduto) { this.codProduto = codProduto; }

    public String getNomeProduto() { return nomeProduto; }
    public void setNomeProduto(String nomeProduto) { this.nomeProduto = nomeProduto; }

    public Integer getEstoqueAtual() { return estoqueAtual; }
    public void setEstoqueAtual(Integer estoqueAtual) { this.estoqueAtual = estoqueAtual; }

    public Integer getEstoqueMinimo() { return estoqueMinimo; }
    public void setEstoqueMinimo(Integer estoqueMinimo) { this.estoqueMinimo = estoqueMinimo; }
}
