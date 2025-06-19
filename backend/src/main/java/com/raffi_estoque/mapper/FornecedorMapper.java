package com.raffi_estoque.mapper;

import com.raffi_estoque.dto.fornecedor.FornecedorCreateDto;
import com.raffi_estoque.dto.fornecedor.FornecedorResponseDto;
import com.raffi_estoque.dto.fornecedor.FornecedorUpdateDto;
import com.raffi_estoque.entities.Fornecedor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component()
public interface FornecedorMapper {
    FornecedorMapper INSTANCE = Mappers.getMapper(FornecedorMapper.class);

    FornecedorResponseDto toFornecedorResponseDto(Fornecedor fornecedor);

    @Mapping(source = "nomeFornecedor", target = "nomeFornecedor")
    @Mapping(source = "complemento", target = "complemento")
    @Mapping(source = "numeroRua", target = "numeroRua")
    @Mapping(source = "cep", target = "cep")
    Fornecedor toFornecedor(FornecedorCreateDto fornecedor);

    List<FornecedorResponseDto> toListResponseDto(List<Fornecedor> fornecedor);

    Fornecedor toFornecedor(FornecedorUpdateDto updateDto);

    FornecedorUpdateDto toUpdate(Fornecedor fornecedor);
}