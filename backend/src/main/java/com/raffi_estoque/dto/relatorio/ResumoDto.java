package com.raffi_estoque.dto.relatorio;

public class ResumoDto {

    private Long totalClientes;
    private Long totalFornecedores;
    private Long totalProdutos;
    private Long totalVendasMesAtual;
    private Double faturamentoMesAtual;
    private Double faturamentoMesAnterior;
    private Long produtosEstoqueBaixo;

    public Long getTotalClientes() { return totalClientes; }
    public void setTotalClientes(Long totalClientes) { this.totalClientes = totalClientes; }

    public Long getTotalFornecedores() { return totalFornecedores; }
    public void setTotalFornecedores(Long totalFornecedores) { this.totalFornecedores = totalFornecedores; }

    public Long getTotalProdutos() { return totalProdutos; }
    public void setTotalProdutos(Long totalProdutos) { this.totalProdutos = totalProdutos; }

    public Long getTotalVendasMesAtual() { return totalVendasMesAtual; }
    public void setTotalVendasMesAtual(Long totalVendasMesAtual) { this.totalVendasMesAtual = totalVendasMesAtual; }

    public Double getFaturamentoMesAtual() { return faturamentoMesAtual; }
    public void setFaturamentoMesAtual(Double faturamentoMesAtual) { this.faturamentoMesAtual = faturamentoMesAtual; }

    public Double getFaturamentoMesAnterior() { return faturamentoMesAnterior; }
    public void setFaturamentoMesAnterior(Double faturamentoMesAnterior) { this.faturamentoMesAnterior = faturamentoMesAnterior; }

    public Long getProdutosEstoqueBaixo() { return produtosEstoqueBaixo; }
    public void setProdutosEstoqueBaixo(Long produtosEstoqueBaixo) { this.produtosEstoqueBaixo = produtosEstoqueBaixo; }
}
