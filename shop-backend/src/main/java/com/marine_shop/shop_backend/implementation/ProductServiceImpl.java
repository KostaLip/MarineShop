package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.Category;
import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.repository.ProductRepository;
import com.marine_shop.shop_backend.services.ProductService;

@Component
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository repo;

	@Override
	public List<Product> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<Product> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public Product create(Product t) {
		return repo.save(t);
	}

	@Override
	public Optional<Product> update(Product t, int id) {
		if(repo.existsById(id)) {
			t.setProductID(id);
			return Optional.of(repo.save(t));
		}
	    return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

	@Override
	public Optional<Product> findByProductName(String productName) {
		return repo.findByProductName(productName);
	}

	@Override
	public List<Product> findByCategory(Category category) {
		return repo.findByCategory(category);
	}

	@Override
	public List<Product> findByPrice(double price) {
		return repo.findByPrice(price);
	}

	@Override
	public List<Product> findByPriceGreaterThan(double price) {
		return repo.findByPriceGreaterThan(price);
	}

	@Override
	public List<Product> findByPriceLessThan(double price) {
		return repo.findByPriceLessThan(price);
	}

	@Override
	public List<Product> findByStockQuantityGreaterThan(int quantity) {
		return repo.findByStockQuantityGreaterThan(quantity);
	}

	@Override
	public List<Product> findByStockQuantityLessThan(int quantity) {
		return repo.findByStockQuantityLessThan(quantity);
	}

}
