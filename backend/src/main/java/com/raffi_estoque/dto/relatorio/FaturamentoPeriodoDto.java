package com.raffi_estoque.dto.relatorio;

public class FaturamentoPeriodoDto {

    private Double totalFaturado;
    private Long quantidadeVendas;
    private Double ticketMedio;

    public Double getTotalFaturado() { return totalFaturado; }
    public void setTotalFaturado(Double totalFaturado) { this.totalFaturado = totalFaturado; }

    public Long getQuantidadeVendas() { return quantidadeVendas; }
    public void setQuantidadeVendas(Long quantidadeVendas) { this.quantidadeVendas = quantidadeVendas; }

    public Double getTicketMedio() { return ticketMedio; }
    public void setTicketMedio(Double ticketMedio) { this.ticketMedio = ticketMedio; }
}
