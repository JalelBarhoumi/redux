package com.eredux.training1.repository;

import com.eredux.training1.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Utilisateur,Long> {
    Utilisateur findByEmailAndPassword(String email, String password);
    Utilisateur findByEmail(String email);

}
