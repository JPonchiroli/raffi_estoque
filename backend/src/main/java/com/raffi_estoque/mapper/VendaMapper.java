package com.raffi_estoque.mapper;

import com.raffi_estoque.dto.cliente.ClienteUpdateDto;
import com.raffi_estoque.dto.produto.ProdutoMapperHelper;
import com.raffi_estoque.dto.venda.ItemVendaCreateDto;
import com.raffi_estoque.dto.venda.ItemVendaResponseDto;
import com.raffi_estoque.dto.venda.VendaCreateDto;
import com.raffi_estoque.dto.venda.VendaResponseDto;
import com.raffi_estoque.entities.ItemVenda;
import com.raffi_estoque.entities.Usuario;
import com.raffi_estoque.entities.Venda;

import org.springframework.stereotype.Component;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = ProdutoMapperHelper.class)
@Component()
public interface VendaMapper {

    @Mapping(target = "itens", source = "itens")
    VendaResponseDto toVendaResponseDto(Venda venda);

    @Mapping(target = "produto", source = "codProduto", qualifiedByName = "produtoFromId")
    ItemVenda toItemVenda(ItemVendaCreateDto dto);

    @Mapping(target = "codProduto", source = "produto.codProduto")
    @Mapping(target = "nomeProduto", source = "produto.nomeProduto")
    @Mapping(target = "valorUnitario", source = "produto.valorVenda")
    @Mapping(target = "subTotal", source = ".", qualifiedByName = "calculateSubTotal")
    ItemVendaResponseDto toItemVendaResponseDto(ItemVenda item);

    @Mapping(target = "usuario", source = "codUsuario")
    Venda toVenda(VendaCreateDto vendaCreateDto);

    default Usuario map(Integer codUsuario) {

        if (codUsuario == null) {
            return null;
        }

        Usuario usuario = new Usuario();
        usuario.setUsuarioId(codUsuario);

        return usuario;
    }

    List<VendaResponseDto> toListResponseDto(List<Venda> venda);

    //Venda toVenda(VendaUpdateDto updateDto);

    ClienteUpdateDto toUpdate(Venda venda);

    @Named("calculateSubTotal")
    static double calculateSubTotal(ItemVenda item) {
        return item.getQuantidade() * item.getProduto().getValorVenda();
    }
}

