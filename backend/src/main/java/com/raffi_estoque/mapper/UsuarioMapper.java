package com.raffi_estoque.mapper;

import com.raffi_estoque.dto.usuario.UsuarioCreateDto;
import com.raffi_estoque.dto.usuario.UsuarioResponseDto;
import com.raffi_estoque.entities.Usuario;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", uses = UsuarioMapper.class)
@Component()
public interface UsuarioMapper {

    Usuario toUsuario(UsuarioCreateDto dto);

    UsuarioResponseDto toResponse(Usuario dto);

}
