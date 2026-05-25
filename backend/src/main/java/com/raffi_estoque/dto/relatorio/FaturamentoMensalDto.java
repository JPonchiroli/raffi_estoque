package com.raffi_estoque.dto.relatorio;

public class FaturamentoMensalDto {

    private Integer ano;
    private Integer mes;
    private String mesAno;
    private Double valorTotal;

    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }

    public Integer getMes() { return mes; }
    public void setMes(Integer mes) { this.mes = mes; }

    public String getMesAno() { return mesAno; }
    public void setMesAno(String mesAno) { this.mesAno = mesAno; }

    public Double getValorTotal() { return valorTotal; }
    public void setValorTotal(Double valorTotal) { this.valorTotal = valorTotal; }
}
