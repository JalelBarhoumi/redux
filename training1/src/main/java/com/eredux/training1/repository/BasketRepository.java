package com.eredux.training1.repository;

import com.eredux.training1.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketRepository extends JpaRepository<Panier,Long> {
}
