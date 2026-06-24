package com.stylestock.repository;

import com.stylestock.entity.Roupa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoupaRepository extends JpaRepository<Roupa, Long> {

    List<Roupa> findByNomeContainingIgnoreCase(String nome);
}
