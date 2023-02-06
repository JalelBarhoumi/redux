package com.eredux.training1.controller;

import com.eredux.training1.model.Produit;
import com.eredux.training1.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController

public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @PostMapping("/product")
    Produit newProduct(@RequestBody Produit newProduct){
        return productRepository.save(newProduct);
    }

    @GetMapping("/products")
    List<Produit> getAllProducts(){
        return productRepository.findAll();   }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/product/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        produit.setId(id);
        Produit updatedProduit = productRepository.save(produit);
        return ResponseEntity.ok(updatedProduit);
    }
}
