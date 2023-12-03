package com.example.stockmanager.controller;

import com.example.stockmanager.repo.ProductRepo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductRepo productRepo;

    public ProductController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }
}
