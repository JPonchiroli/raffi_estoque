package com.raffi_estoque.controllers;

import com.raffi_estoque.dto.usuario.UsuarioCreateDto;
import com.raffi_estoque.dto.usuario.UsuarioResponseDto;
import com.raffi_estoque.entities.Usuario;
import com.raffi_estoque.mapper.UsuarioMapper;
import com.raffi_estoque.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @PostMapping("/create")
    public ResponseEntity<UsuarioResponseDto> createUsuario(@RequestBody UsuarioCreateDto dto) {

        Usuario usuario = usuarioMapper.toUsuario(dto);
        usuarioService.save(usuario);
        return ResponseEntity.status(201).body(usuarioMapper.toResponse(usuario));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody UsuarioCreateDto loginDto
    ) {

        try {

            UsuarioResponseDto response =
                    usuarioService.login(loginDto);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }


}
