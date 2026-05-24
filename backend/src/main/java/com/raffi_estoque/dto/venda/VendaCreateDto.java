package com.raffi_estoque.dto.venda;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class VendaCreateDto {

    @NotBlank
    private Integer codCliente;

    @NotBlank
    private List<ItemVendaCreateDto> itens;

    @NotBlank
    private Integer codUsuario;

    public VendaCreateDto(){}

    public VendaCreateDto(Integer codCliente, List<ItemVendaCreateDto> itens, Integer codUsuario) {
        this.codCliente = codCliente;
        this.itens = itens;
        this.codUsuario = codUsuario;
    }

    public Integer getCodCliente() {
        return codCliente;
    }

    public void setCodCliente(Integer codCliente) {
        this.codCliente = codCliente;
    }

    public List<ItemVendaCreateDto> getItens() {
        return itens;
    }

    public void setItens(List<ItemVendaCreateDto> itens) {
        this.itens = itens;
    }

    public Integer getCodUsuario() {
        return codUsuario;
    }

    public void setCodUsuario(Integer codUsuario) {
        this.codUsuario = codUsuario;
    }

    @Override
    public String toString() {
        return "VendaCreateDto{" +
                "codCliente=" + codCliente +
                ", itens=" + itens +
                '}';
    }
}
