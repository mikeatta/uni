package com.example.stockmanager.repo;

import com.example.stockmanager.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Long> {
}
