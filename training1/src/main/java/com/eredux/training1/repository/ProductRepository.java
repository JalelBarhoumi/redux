package com.eredux.training1.repository;

import com.eredux.training1.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Produit,Long> {
}
