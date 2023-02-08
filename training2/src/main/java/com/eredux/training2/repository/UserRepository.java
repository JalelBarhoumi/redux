package com.eredux.training2.repository;

import com.eredux.training2.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Utilisateur,Long> {
    Utilisateur findByEmailAndPassword(String email, String password);

    Utilisateur findByEmail(String email);

}