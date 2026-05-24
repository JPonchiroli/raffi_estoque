package com.raffi_estoque.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tb_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer usuarioId;

    @Column
    private String usuarioNome;

    @Column
    private String usuarioSenha;

    @OneToMany(mappedBy = "usuario")
    private List<Fornecedor> fornecedor;

    @OneToMany(mappedBy = "usuario")
    private List<Cliente> cliente;

    @OneToMany(mappedBy = "usuario")
    private List<Produto> produtos;

    @OneToMany(mappedBy = "usuario")
    private List<Venda> venda;

    public Usuario(){}

    public Usuario(Integer usuarioId, String usuarioNome, String usuarioSenha) {
        this.usuarioId = usuarioId;
        this.usuarioNome = usuarioNome;
        this.usuarioSenha = usuarioSenha;
    }

    public Usuario(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioNome() {
        return usuarioNome;
    }

    public void setUsuarioNome(String usuarioNome) {
        this.usuarioNome = usuarioNome;
    }

    public String getUsuarioSenha() {
        return usuarioSenha;
    }

    public void setUsuarioSenha(String usuarioSenha) {
        this.usuarioSenha = usuarioSenha;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "usuarioId=" + usuarioId +
                ", usuarioNome='" + usuarioNome + '\'' +
                ", usuarioSenha='" + usuarioSenha + '\'' +
                '}';
    }
}
