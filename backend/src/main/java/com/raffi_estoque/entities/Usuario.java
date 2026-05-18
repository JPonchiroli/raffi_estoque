package com.raffi_estoque.entities;

import jakarta.persistence.*;

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

    public Usuario(){}

    public Usuario(Integer usuarioId, String usuarioNome, String usuarioSenha) {
        this.usuarioId = usuarioId;
        this.usuarioNome = usuarioNome;
        this.usuarioSenha = usuarioSenha;
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
