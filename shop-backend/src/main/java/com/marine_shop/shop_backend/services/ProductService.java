package com.marine_shop.shop_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.marine_shop.shop_backend.models.Category;
import com.marine_shop.shop_backend.models.Product;

@Service
public interface ProductService extends CrudService<Product>{
	
	Optional<Product> findByProductName(String productName);
    List<Product> findByCategory(Category category);
    List<Product> findByPrice(double price);
    List<Product> findByPriceGreaterThan(double price);
    List<Product> findByPriceLessThan(double price);
    List<Product> findByStockQuantityGreaterThan(int quantity);
    List<Product> findByStockQuantityLessThan(int quantity);

}
