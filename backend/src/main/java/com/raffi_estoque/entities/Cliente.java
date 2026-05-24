package com.raffi_estoque.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codCliente;

    @Column(name = "nomeCliente")
    private String nomeCliente;

    @Column
    private String cep;

    @Column
    private String rua;

    @Column
    private Integer numeroRua;

    @Column
    private String bairro;

    @Column
    private String cidade;

    @Column
    private String uf;

    @Column
    private String complemento;

    @ManyToOne
    @JoinColumn(name = "codUsuario", nullable = false)
    private Usuario usuario;

    public Cliente(){}

    public Cliente(Integer codCliente, String nomeCliente, String cep, String rua, Integer numeroRua, String bairro, String cidade, String uf, String complemento) {
        this.codCliente = codCliente;
        this.nomeCliente = nomeCliente;
        this.cep = cep;
        this.rua = rua;
        this.numeroRua = numeroRua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.complemento = complemento;
    }

    // Getters and Setters


    public Integer getCodCliente() {
        return codCliente;
    }

    public void setCodCliente(Integer codCliente) {
        this.codCliente = codCliente;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public Integer getNumeroRua() {
        return numeroRua;
    }

    public void setNumeroRua(Integer numeroRua) {
        this.numeroRua = numeroRua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "codCliente=" + codCliente +
                ", nomeCliente='" + nomeCliente + '\'' +
                ", cep='" + cep + '\'' +
                ", rua='" + rua + '\'' +
                ", numeroRua=" + numeroRua +
                ", bairro='" + bairro + '\'' +
                ", cidade='" + cidade + '\'' +
                ", uf='" + uf + '\'' +
                ", complemento='" + complemento + '\'' +
                '}';
    }
}