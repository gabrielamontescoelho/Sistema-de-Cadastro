package com.stylestock.service;

import com.stylestock.entity.Roupa;
import com.stylestock.repository.RoupaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoupaService {

    private final RoupaRepository roupaRepository;

    public RoupaService(RoupaRepository roupaRepository) {
        this.roupaRepository = roupaRepository;
    }

    public List<Roupa> listarTodas() {
        return roupaRepository.findAll();
    }

    public Optional<Roupa> buscarPorId(Long id) {
        return roupaRepository.findById(id);
    }

    public List<Roupa> buscarPorNome(String nome) {
        return roupaRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Roupa cadastrar(Roupa roupa) {
        return roupaRepository.save(roupa);
    }

    public Optional<Roupa> atualizar(Long id, Roupa roupaAtualizada) {
        return roupaRepository.findById(id).map(roupa -> {
            roupa.setNome(roupaAtualizada.getNome());
            roupa.setCategoria(roupaAtualizada.getCategoria());
            roupa.setTamanho(roupaAtualizada.getTamanho());
            roupa.setCor(roupaAtualizada.getCor());
            roupa.setPublico(roupaAtualizada.getPublico());
            roupa.setPreco(roupaAtualizada.getPreco());
            roupa.setQuantidade(roupaAtualizada.getQuantidade());
            roupa.setDescricao(roupaAtualizada.getDescricao());
            return roupaRepository.save(roupa);
        });
    }

    public boolean excluir(Long id) {
        if (roupaRepository.existsById(id)) {
            roupaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
