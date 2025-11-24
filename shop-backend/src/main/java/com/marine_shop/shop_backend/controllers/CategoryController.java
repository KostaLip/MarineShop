package com.marine_shop.shop_backend.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.marine_shop.shop_backend.models.Category;
import com.marine_shop.shop_backend.services.CategoryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CategoryController {

	@Autowired
	private CategoryService service;
	
	@GetMapping("/category")
	public List<Category> getAllCategories() {
		return service.getAll();
	}
	
	@GetMapping("/category/{id}")
	public ResponseEntity<?> getCategoryById(@PathVariable int id) {
		Optional<Category> category = service.findById(id);
		if(category.isPresent()) {
			return ResponseEntity.ok(category.get());
		}
		return ResponseEntity.status(404).body("Category with required ID: " + id + " does not exist");
	}
	
	@PostMapping("/category/admin")
	public ResponseEntity<?> createCategory(@RequestBody Category category) {
		if(service.existsById(category.getCategoryID())) {
			return ResponseEntity.status(409).body("Category already exists");
		}
		Category savedCategory = service.create(category);
		URI uri = URI.create("/category/id/" + savedCategory.getCategoryID());
		return ResponseEntity.created(uri).body(savedCategory);
	}
	
	@PutMapping("/category/admin/id/{id}")
	public ResponseEntity<?> updateCategory(@RequestBody Category category, @PathVariable int id) {
		Optional<Category> updateCategory = service.update(category, id);
		if(updateCategory.isPresent()) {
			return ResponseEntity.ok(updateCategory.get());
		}
		return ResponseEntity.status(409).body("Category with required ID: " + id + " could not be updated because it does not exist");
	}
	
	@DeleteMapping("/category/admin/id/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable int id) {
		if(service.existsById(id)) {
			service.delete(id);
			return ResponseEntity.ok("Category with ID: " + id + " has been successfully deleted");
		}
		return ResponseEntity.status(404).body("Category with required ID: " + id + " cold not be deleted because it does not exist");
	}
	
	@GetMapping("/category/search/{name}")
	public List<Category> searchCategoriesByName(@PathVariable String name) {
	    return service.searchByName(name);
	}
	
	@GetMapping("/category/with-products")
	public List<Category> getCategoriesWithProducts() {
	    return service.findCategoriesWithProducts();
	}
	
	@GetMapping("/category/without-products")
	public List<Category> getCategoriesWithoutProducts() {
	    return service.findCategoriesWithoutProducts();
	}
	
}
