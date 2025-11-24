package com.marine_shop.shop_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Integer>{

    List<ProductImage> findByProduct(Product product);
    Optional<ProductImage> findByImageUrl(String imageUrl);
    boolean existsByImageUrl(String imageUrl);
    void deleteByProduct(Product product);
    long countByProduct(Product product);
    boolean existsByProduct(Product product);
    
}
