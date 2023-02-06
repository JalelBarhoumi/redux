package com.eredux.training1.controller;


import com.eredux.training1.model.Utilisateur;
import com.eredux.training1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/user")
    Utilisateur newUser(@RequestBody Utilisateur newUser){
        return userRepository.save(newUser);
    }
    @GetMapping("/users")
    List<Utilisateur>getAllUsers(){
        return userRepository.findAll();   }
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/user/{id}")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        utilisateur.setId(id);
        Utilisateur updatedUser = userRepository.save(utilisateur);
        return ResponseEntity.ok(updatedUser);
    }
    @PostMapping("/user/{email}/{password}")
    public Object findUserByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
        Utilisateur user = userRepository.findByEmail(email);
        if (user == null) {
            return "Email doesn't exist";
        } else if (!user.getPassword().equals(password)) {
            return "Wrong password";
        } else {
            return user;
        }
    }


}
