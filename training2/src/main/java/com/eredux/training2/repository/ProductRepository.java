package com.eredux.training2.repository;


import com.eredux.training2.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Produit,Long> {
}