package com.raffi_estoque.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codVenda;

    private Integer codCliente;

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemVenda> itens = new ArrayList<>();

    private Double valorTotal;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH'h'mm dd/MM/yyyy")
    private LocalDateTime dataVenda;

    @ManyToOne
    @JoinColumn(name = "codUsuario", nullable = false)
    private Usuario usuario;

    public Venda(){}

    public Venda(Integer codVenda, Integer codCliente, List<ItemVenda> itens, Double valorTotal, LocalDateTime dataVenda) {
        this.codVenda = codVenda;
        this.codCliente = codCliente;
        this.itens = itens;
        this.valorTotal = valorTotal;
        this.dataVenda = dataVenda;
    }

    public Integer getCodVenda() {
        return codVenda;
    }

    public void setCodVenda(Integer codVenda) {
        this.codVenda = codVenda;
    }

    public Integer getCodCliente() {
        return codCliente;
    }

    public void setCodCliente(Integer codCliente) {
        this.codCliente = codCliente;
    }

    public List<ItemVenda> getItens() {
        return itens;
    }

    public void setItens(List<ItemVenda> itens) {
        this.itens = itens;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public LocalDateTime getDataVenda() {
        return dataVenda;
    }

    public void setDataVenda(LocalDateTime dataVenda) {
        this.dataVenda = dataVenda;
    }

    @Override
    public String toString() {
        return "Venda{" +
                "codVenda=" + codVenda +
                ", codCliente=" + codCliente +
                ", itens=" + itens +
                ", valorTotal=" + valorTotal +
                ", dataVenda=" + dataVenda +
                '}';
    }
}
