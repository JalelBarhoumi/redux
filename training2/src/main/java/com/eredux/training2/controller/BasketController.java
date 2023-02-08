package com.eredux.training2.controller;

import com.eredux.training2.model.Panier;
import com.eredux.training2.repository.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class BasketController {
    @Autowired
    private BasketRepository basketRepository;
    @PostMapping("/basket")
    Panier newBasket(@RequestBody Panier newBasket){
        return basketRepository.save(newBasket);
    }
    @GetMapping("/baskets")
    List<Panier> getAllBaskets(){
        return basketRepository.findAll();   }

    @DeleteMapping("/basket/{id}")
    public ResponseEntity<Void> deleteBusket(@PathVariable Long id) {
        basketRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/basket/{id}")
    public ResponseEntity<Panier> updateBasket(@PathVariable Long id, @RequestBody Panier basket) {
        basket.setId(id);
        Panier updatedBasket = basketRepository.save(basket);
        return ResponseEntity.ok(updatedBasket);
    }
}
