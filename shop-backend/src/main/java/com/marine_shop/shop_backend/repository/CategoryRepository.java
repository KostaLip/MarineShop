package com.marine_shop.shop_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

    Optional<Category> findByCategoryName(String categoryName);
    List<Category> findByCategoryNameContainingIgnoreCase(String categoryName);
    List<Category> findByProductsIsNotEmpty();
    List<Category> findByProductsIsEmpty();
	
}
