package com.raffi_estoque.dto.relatorio;

public class ProdutoMaisVendidoDto {

    private Integer codProduto;
    private String nomeProduto;
    private Long totalVendido;
    private Double valorTotalGerado;

    public Integer getCodProduto() { return codProduto; }
    public void setCodProduto(Integer codProduto) { this.codProduto = codProduto; }

    public String getNomeProduto() { return nomeProduto; }
    public void setNomeProduto(String nomeProduto) { this.nomeProduto = nomeProduto; }

    public Long getTotalVendido() { return totalVendido; }
    public void setTotalVendido(Long totalVendido) { this.totalVendido = totalVendido; }

    public Double getValorTotalGerado() { return valorTotalGerado; }
    public void setValorTotalGerado(Double valorTotalGerado) { this.valorTotalGerado = valorTotalGerado; }
}
