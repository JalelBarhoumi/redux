package com.eredux.training2.repository;


import com.eredux.training2.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketRepository extends JpaRepository<Panier,Long> {
}

