package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.ProductImage;
import com.marine_shop.shop_backend.repository.ProductImageRepository;
import com.marine_shop.shop_backend.services.ProductImageService;

@Component
public class ProductImageServiceImpl implements ProductImageService{

	@Autowired
	private ProductImageRepository repo;

	@Override
	public List<ProductImage> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<ProductImage> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public ProductImage create(ProductImage t) {
		return repo.save(t);
	}

	@Override
	public Optional<ProductImage> update(ProductImage t, int id) {
		if(repo.existsById(id)) {
			t.setProductImageID(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

	@Override
	public List<ProductImage> findByProduct(Product product) {
		return repo.findByProduct(product);
	}
	
}
