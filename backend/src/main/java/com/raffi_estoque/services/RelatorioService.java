package com.raffi_estoque.services;

import com.raffi_estoque.dto.relatorio.*;
import com.raffi_estoque.entities.Produto;
import com.raffi_estoque.entities.Venda;
import com.raffi_estoque.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class RelatorioService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Transactional(readOnly = true)
    public List<ProdutoMaisVendidoDto> getProdutosMaisVendidos() {
        List<Object[]> rows = itemVendaRepository.produtosMaisVendidos();
        List<ProdutoMaisVendidoDto> result = new ArrayList<>();
        for (Object[] row : rows) {
            ProdutoMaisVendidoDto dto = new ProdutoMaisVendidoDto();
            dto.setCodProduto((Integer) row[0]);
            dto.setNomeProduto((String) row[1]);
            dto.setTotalVendido(((Number) row[2]).longValue());
            dto.setValorTotalGerado(((Number) row[3]).doubleValue());
            result.add(dto);
        }
        return result;
    }

    @Transactional(readOnly = true)
    public FaturamentoPeriodoDto getFaturamentoPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        LocalDateTime inicio = dataInicio.atStartOfDay();
        LocalDateTime fim = dataFim.atTime(23, 59, 59);

        Double total = vendaRepository.somaFaturamentoPeriodo(inicio, fim);
        Long quantidade = vendaRepository.contarVendasPeriodo(inicio, fim);

        total = total != null ? total : 0.0;
        quantidade = quantidade != null ? quantidade : 0L;

        FaturamentoPeriodoDto dto = new FaturamentoPeriodoDto();
        dto.setTotalFaturado(total);
        dto.setQuantidadeVendas(quantidade);
        dto.setTicketMedio(quantidade > 0 ? total / quantidade : 0.0);
        return dto;
    }

    @Transactional(readOnly = true)
    public List<FaturamentoMensalDto> getFaturamentoMensal() {
        LocalDateTime dozeAtras = LocalDateTime.now().minusMonths(12).withDayOfMonth(1)
                .withHour(0).withMinute(0).withSecond(0);
        List<Venda> vendas = vendaRepository.findByDataVendaBetween(dozeAtras, LocalDateTime.now());

        Map<String, FaturamentoMensalDto> map = new LinkedHashMap<>();
        for (Venda v : vendas) {
            if (v.getDataVenda() == null) continue;
            int ano = v.getDataVenda().getYear();
            int mes = v.getDataVenda().getMonthValue();
            String key = String.format("%04d-%02d", ano, mes);

            FaturamentoMensalDto dto = map.get(key);
            if (dto == null) {
                dto = new FaturamentoMensalDto();
                dto.setAno(ano);
                dto.setMes(mes);
                dto.setMesAno(String.format("%02d/%d", mes, ano));
                dto.setValorTotal(0.0);
                map.put(key, dto);
            }
            dto.setValorTotal(dto.getValorTotal() + (v.getValorTotal() != null ? v.getValorTotal() : 0.0));
        }
        return new ArrayList<>(map.values());
    }

    @Transactional(readOnly = true)
    public List<ProdutoEstoqueBaixoDto> getProdutosEstoqueBaixo() {
        List<Produto> produtos = produtoRepository.findProdutosEstoqueBaixo();
        List<ProdutoEstoqueBaixoDto> result = new ArrayList<>();
        for (Produto p : produtos) {
            ProdutoEstoqueBaixoDto dto = new ProdutoEstoqueBaixoDto();
            dto.setCodProduto(p.getCodProduto());
            dto.setNomeProduto(p.getNomeProduto());
            dto.setEstoqueAtual(p.getEstoqueAtual());
            dto.setEstoqueMinimo(p.getEstoqueMinimo());
            result.add(dto);
        }
        return result;
    }

    @Transactional(readOnly = true)
    public ResumoDto getResumo() {
        LocalDateTime now = LocalDateTime.now();
        int anoAtual = now.getYear();
        int mesAtual = now.getMonthValue();

        LocalDateTime inicioMesAtual = LocalDateTime.of(anoAtual, mesAtual, 1, 0, 0, 0);
        LocalDateTime fimMesAtual = now;

        int mesAnterior = mesAtual == 1 ? 12 : mesAtual - 1;
        int anoAnterior = mesAtual == 1 ? anoAtual - 1 : anoAtual;
        LocalDateTime inicioMesAnterior = LocalDateTime.of(anoAnterior, mesAnterior, 1, 0, 0, 0);
        LocalDateTime fimMesAnterior = inicioMesAtual.minusSeconds(1);

        ResumoDto dto = new ResumoDto();
        dto.setTotalClientes(clienteRepository.count());
        dto.setTotalFornecedores(fornecedorRepository.count());
        dto.setTotalProdutos(produtoRepository.count());

        Long totalVendasMes = vendaRepository.contarVendasPeriodo(inicioMesAtual, fimMesAtual);
        dto.setTotalVendasMesAtual(totalVendasMes != null ? totalVendasMes : 0L);

        Double faturamentoAtual = vendaRepository.somaFaturamentoPeriodo(inicioMesAtual, fimMesAtual);
        dto.setFaturamentoMesAtual(faturamentoAtual != null ? faturamentoAtual : 0.0);

        Double faturamentoAnterior = vendaRepository.somaFaturamentoPeriodo(inicioMesAnterior, fimMesAnterior);
        dto.setFaturamentoMesAnterior(faturamentoAnterior != null ? faturamentoAnterior : 0.0);

        Long estoqueBaixo = produtoRepository.countProdutosEstoqueBaixo();
        dto.setProdutosEstoqueBaixo(estoqueBaixo != null ? estoqueBaixo : 0L);

        return dto;
    }
}
