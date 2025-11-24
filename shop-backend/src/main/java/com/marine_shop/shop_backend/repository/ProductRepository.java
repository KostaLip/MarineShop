package com.marine_shop.shop_backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Category;
import com.marine_shop.shop_backend.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

	Optional<Product> findById(int id);
    List<Product> findByProductNameContainingIgnoreCase(String productName);
    Optional<Product> findByProductName(String productName);
    List<Product> findByDescriptionContainingIgnoreCase(String description);
    List<Product> findByCategory(Category category);
    
    @Query("SELECT p FROM Product p WHERE p.category.categoryName = :categoryName")
    List<Product> findByCategoryName(@Param("categoryName") String categoryName);
    
    List<Product> findByPrice(double price);
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
    List<Product> findByPriceGreaterThan(double price);
    List<Product> findByPriceLessThan(double price);
    List<Product> findByStockQuantityGreaterThan(int quantity);
    List<Product> findByStockQuantityLessThan(int quantity);
    
    @Query("SELECT p FROM Product p WHERE p.stockQuantity > 0")
    List<Product> findProductsInStock();
    
    @Query("SELECT p FROM Product p WHERE p.stockQuantity = 0")
    List<Product> findProductsNotInStock();
    
    List<Product> findByDateCreatedAfter(LocalDateTime date);
    List<Product> findByDateCreatedBetween(LocalDateTime start, LocalDateTime end);
    List<Product> findTop10ByOrderByDateCreatedDesc();
    List<Product> findByCategoryAndPriceBetween(Category category, double minPrice, double maxPrice);
    List<Product> findByCategoryOrderByPriceAsc(Category category);
    List<Product> findByCategoryOrderByPriceDesc(Category category);
    List<Product> findByCategoryOrderByProductNameAsc(Category category);
    
    @Query("SELECT p FROM Product p WHERE SIZE(p.reviews) > 0")
    List<Product> findProductsWithReviews();
}
