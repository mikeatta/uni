package com.example.inpost.repo;

import com.example.inpost.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepo extends JpaRepository<Package, Long> {
}
