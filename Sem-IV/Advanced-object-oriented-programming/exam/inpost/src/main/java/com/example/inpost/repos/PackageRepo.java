package com.example.inpost.repos;

import com.example.inpost.models.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepo extends JpaRepository<Package, Long> {
}
