package com.raffi_estoque.dto.usuario;

public class UsuarioCreateDto {

    private String usuarioNome;

    private String usuarioSenha;

    public UsuarioCreateDto(){}

    public UsuarioCreateDto(String usuarioNome, String usuarioSenha) {
        this.usuarioNome = usuarioNome;
        this.usuarioSenha = usuarioSenha;
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
        return "UsuarioCreateDto{" +
                "usuarioNome='" + usuarioNome + '\'' +
                ", usuarioSenha='" + usuarioSenha + '\'' +
                '}';
    }
}
