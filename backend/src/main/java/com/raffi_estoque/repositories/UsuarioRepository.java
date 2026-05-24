package com.raffi_estoque.repositories;

import com.raffi_estoque.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsuarioNomeAndUsuarioSenha(String usuarioNome, String usuarioSenha);
}
