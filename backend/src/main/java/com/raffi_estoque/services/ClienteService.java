package com.raffi_estoque.services;

import com.raffi_estoque.dto.viacep.ViaCepResponse;
import com.raffi_estoque.entities.Cliente;
import com.raffi_estoque.feign.ViaCepClient;
import com.raffi_estoque.repositories.ClienteRepository;
import com.raffi_estoque.services.exception.ObjectNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private AddressService addressService;

    @Autowired
    private ViaCepClient viaCepclient;

    @Transactional
    public Cliente save(Cliente cliente){
        String cep = cliente.getCep();
        String cepFormatado = addressService.zerarCep(cep);

        cliente.setCep(cepFormatado);

        if (!addressService.isCepZerado(cepFormatado)) {
            ViaCepResponse address = getAddress(cepFormatado);
            cliente.setRua(address.getLogradouro());
            cliente.setBairro(address.getBairro());
            cliente.setCidade(address.getLocalidade());
            cliente.setUf(address.getUf());
        }

        return clienteRepository.save(cliente);
    }

    @Transactional
    public Cliente findById(Integer id){
        Optional<Cliente> event = clienteRepository.findById(id);
        return event.orElseThrow(() -> new ObjectNotFoundException("Cliente Não Encontrado"));
    }

    @Transactional
    public List<Cliente> findAll(){
        return clienteRepository.findAll();
    }

    @Transactional
    public Cliente update(Integer id, Cliente cliente){
        Cliente clienteUpd = findById(id);
        clienteUpd.setNomeCliente(cliente.getNomeCliente());
        clienteUpd.setCep(cliente.getCep());

        String cepFormatado = addressService.zerarCep(cliente.getCep());
        cliente.setCep(cepFormatado);

        if (!addressService.isCepZerado(cepFormatado)) {
            ViaCepResponse address = getAddress(cepFormatado);
            clienteUpd.setRua(address.getLogradouro());
            clienteUpd.setBairro(address.getBairro());
            clienteUpd.setCidade(address.getLocalidade());
            clienteUpd.setUf(address.getUf());
        }

        clienteUpd.setNumeroRua(cliente.getNumeroRua());
        clienteUpd.setComplemento(cliente.getComplemento());
        clienteUpd.setEmail(cliente.getEmail());
        clienteUpd.setTelefone(cliente.getTelefone());
        return clienteRepository.save(clienteUpd);
    }

    @Transactional
    public void deleteById(Integer id) {
        Optional<Cliente> cliente = Optional.ofNullable(clienteRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Cliente Não Encontrado")));

        clienteRepository.deleteById(id);
    }

    public ViaCepResponse getAddress(String cep) {
        return viaCepclient.getAddress(cep);
    }

    public List<Cliente> findFornecedorPorNome(String nomeCliente) {
        return clienteRepository.findByNomeClienteContainingIgnoreCase(nomeCliente);
    }
}
