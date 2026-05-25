package com.raffi_estoque.mapper;

import com.raffi_estoque.dto.cliente.ClienteCreateDto;
import com.raffi_estoque.dto.cliente.ClienteResponseDto;
import com.raffi_estoque.dto.cliente.ClienteUpdateDto;
import com.raffi_estoque.entities.Cliente;

import com.raffi_estoque.entities.Usuario;
import org.springframework.stereotype.Component;

import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
@Component()
public interface ClienteMapper {
    ClienteMapper INSTANCE = Mappers.getMapper(ClienteMapper.class);

    ClienteResponseDto toClienteResponseDto(Cliente cliente);

    @Mapping(target = "usuario", source = "codUsuario")
    Cliente toCliente(ClienteCreateDto clienteCreateDto);

    default Usuario map(Integer codUsuario) {

        if (codUsuario == null) {
            return null;
        }

        Usuario usuario = new Usuario();
        usuario.setUsuarioId(codUsuario);

        return usuario;
    }


    List<ClienteResponseDto> toListResponseDto(List<Cliente> cliente);

    Cliente toCliente(ClienteUpdateDto updateDto);

    @Mapping(source = "numeroRua", target = "numeroRua")
    ClienteUpdateDto toUpdate(Cliente cliente);
}