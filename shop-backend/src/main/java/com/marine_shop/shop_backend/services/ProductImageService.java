package com.marine_shop.shop_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.ProductImage;

@Service
public interface ProductImageService extends CrudService<ProductImage>{

    List<ProductImage> findByProduct(Product product);
	
}
