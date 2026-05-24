package com.raffi_estoque.dto.cliente;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;

public class ClienteCreateDto {

    @NotBlank
    private String nomeCliente;

    @Size(min = 8, max = 8)
    private String cep;

    @Size(min = 3, max = 50)
    private String complemento;

    private Integer numeroRua;

    @NotNull
    private Integer codUsuario;

    @Email
    private String email;

    private String telefone;

    public ClienteCreateDto() {
    }

    public ClienteCreateDto(String nomeCliente, String cep, String complemento, Integer numeroRua, Integer codUsuario, String email, String telefone) {
        this.nomeCliente = nomeCliente;
        this.cep = cep;
        this.complemento = complemento;
        this.numeroRua = numeroRua;
        this.codUsuario = codUsuario;
        this.email = email;
        this.telefone = telefone;
    }

    public @NotBlank String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(@NotBlank String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public @Size(min = 8, max = 8) String getCep() {
        return cep;
    }

    public void setCep(@NotBlank @Size(min = 8, max = 8) String cep) {
        this.cep = cep;
    }

    public @Size(min = 3, max = 50) String getComplemento() {
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

    public Integer getCodUsuario() {
        return codUsuario;
    }

    public void setCodUsuario(Integer codUsuario) {
        this.codUsuario = codUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
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