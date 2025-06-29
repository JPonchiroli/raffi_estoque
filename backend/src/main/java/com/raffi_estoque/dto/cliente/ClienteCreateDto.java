package com.raffi_estoque.dto.cliente;

import jakarta.validation.constraints.*;

public class ClienteCreateDto {

    @NotBlank
    private String nomeCliente;

    @Size(min = 8, max = 8)
    private String cep;

    @Size(min = 3, max = 50)
    private String complemento;

    private Integer numeroRua;

    public ClienteCreateDto() {
    }

    public ClienteCreateDto(String nomeCliente, String cep, String complemento, Integer numeroRua) {
        this.nomeCliente = nomeCliente;
        this.cep = cep;
        this.complemento = complemento;
        this.numeroRua = numeroRua;
    }

    public @NotBlank String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(@NotBlank String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public @NotBlank @Size(min = 8, max = 8) String getCep() {
        return cep;
    }

    public void setCep(@NotBlank @Size(min = 8, max = 8) String cep) {
        this.cep = cep;
    }

    public @NotBlank @Size(min = 3, max = 50) String getComplemento() {
        return complemento;
    }

    public void setComplemento(@NotBlank @Size(min = 3, max = 50) String complemento) {
        this.complemento = complemento;
    }

    public Integer getNumeroRua() {
        return numeroRua;
    }

    public void setNumeroRua(Integer numeroRua) {
        this.numeroRua = numeroRua;
    }

    @Override
    public String toString() {
        return "ClienteCreateDto{" +
                "nomeCliente='" + nomeCliente + '\'' +
                ", cep='" + cep + '\'' +
                ", complemento='" + complemento + '\'' +
                ", numeroRua=" + numeroRua +
                '}';
    }
}