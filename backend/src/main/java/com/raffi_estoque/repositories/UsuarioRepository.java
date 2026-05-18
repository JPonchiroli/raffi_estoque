package com.raffi_estoque.repositories;

import com.raffi_estoque.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {}
