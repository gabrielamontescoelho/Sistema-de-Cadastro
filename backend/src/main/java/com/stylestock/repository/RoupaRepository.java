package com.stylestock.repository;

import com.stylestock.entity.Roupa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoupaRepository extends JpaRepository<Roupa, Long> {

    List<Roupa> findByNomeContainingIgnoreCase(String nome);
}
