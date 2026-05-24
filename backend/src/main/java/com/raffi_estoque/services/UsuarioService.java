package com.raffi_estoque.services;

import com.raffi_estoque.dto.usuario.UsuarioCreateDto;
import com.raffi_estoque.dto.usuario.UsuarioResponseDto;
import com.raffi_estoque.entities.Usuario;
import com.raffi_estoque.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public UsuarioResponseDto login(UsuarioCreateDto loginDto) {

        Optional<Usuario> usuarioOptional =
                usuarioRepository.findByUsuarioNomeAndUsuarioSenha(
                        loginDto.getUsuarioNome(),
                        loginDto.getUsuarioSenha()
                );

        if (usuarioOptional.isEmpty()) {

            throw new RuntimeException(
                    "Usuário ou senha inválidos"
            );
        }

        Usuario usuario = usuarioOptional.get();

        return new UsuarioResponseDto(
                usuario.getUsuarioId(),
                usuario.getUsuarioNome(),
                usuario.getUsuarioSenha()
        );
    }

}
