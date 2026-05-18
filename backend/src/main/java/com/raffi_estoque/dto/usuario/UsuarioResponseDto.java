package com.raffi_estoque.dto.usuario;

public class UsuarioResponseDto {

    private String usuarioNome;

    private String usuarioSenha;

    public UsuarioResponseDto(){}

    public UsuarioResponseDto(String usuarioNome, String usuarioSenha) {
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
        return "UsuarioResponseDto{" +
                "usuarioNome='" + usuarioNome + '\'' +
                ", usuarioSenha='" + usuarioSenha + '\'' +
                '}';
    }
}
