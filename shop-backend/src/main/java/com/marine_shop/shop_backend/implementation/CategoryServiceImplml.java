package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.Category;
import com.marine_shop.shop_backend.repository.CategoryRepository;
import com.marine_shop.shop_backend.services.CategoryService;

@Component
public class CategoryServiceImplml implements CategoryService{

	@Autowired
	private CategoryRepository repo;

	@Override
	public List<Category> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<Category> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public Category create(Category t) {
		return repo.save(t);
	}

	@Override
	public Optional<Category> update(Category t, int id) {
		if(repo.existsById(id)) {
			t.setCategoryID(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

	@Override
	public List<Category> findCategoriesWithoutProducts() {
		return repo.findByProductsIsEmpty();
	}
	
	@Override
	public List<Category> searchByName(String name) {
		return repo.findByCategoryNameContainingIgnoreCase(name);
	}

	@Override
	public List<Category> findCategoriesWithProducts() {
		return repo.findByProductsIsNotEmpty();
	}

}
