package com.example.stockmanager.controller;

import com.example.stockmanager.model.Product;
import com.example.stockmanager.repo.ProductRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/products")
public class ProductController {

    private final ProductRepo productRepo;

    public ProductController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productRepo.findAll();
    }

    @PostMapping
    public void addProduct(@RequestBody Product product) {
        productRepo.save(product);
    }

    @PutMapping(value = "/{id}")
    public void updateProduct(@PathVariable UUID id, @RequestBody Product product) {
        Optional<Product> productSaved = productRepo.findById(id);
        productSaved.ifPresent(p -> {
            Product updatedProduct = productSaved.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setSize(product.getSize());
            updatedProduct.setSku(product.getSku());
            updatedProduct.setPurchasePrice(product.getPurchasePrice());
            updatedProduct.setMarketPrice(product.getMarketPrice());
            productRepo.save(updatedProduct);
        });
    }

    @DeleteMapping(value = "/{id}")
    public void removeProduct(@PathVariable UUID id) {
        Optional<Product> product = productRepo.findById(id);
        product.ifPresent(productRepo::delete);
    }
}
