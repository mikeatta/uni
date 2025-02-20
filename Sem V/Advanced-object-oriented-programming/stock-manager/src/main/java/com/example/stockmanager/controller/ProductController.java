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
    public Product addProduct(@RequestBody Product product) {
        product.setAmountMade(product.getAmountMade());
        return productRepo.save(product);
    }

    @PutMapping(value = "/{id}")
    public Optional<Product> updateProduct(@PathVariable UUID id, @RequestBody Product product) {
        Optional<Product> productSaved = productRepo.findById(id);
        productSaved.ifPresent(p -> {
            Product updatedProduct = productSaved.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setSize(product.getSize());
            updatedProduct.setSku(product.getSku());
            updatedProduct.setCategory(product.getCategory());
            updatedProduct.setPurchasePrice(product.getPurchasePrice());
            updatedProduct.setMarketPrice(product.getMarketPrice());
            updatedProduct.setAmountMade(product.getAmountMade());
            productRepo.save(updatedProduct);
        });
        return productSaved;
    }

    @DeleteMapping(value = "/{id}")
    public void removeProduct(@PathVariable UUID id) {
        Optional<Product> product = productRepo.findById(id);
        product.ifPresent(productRepo::delete);
    }
}
