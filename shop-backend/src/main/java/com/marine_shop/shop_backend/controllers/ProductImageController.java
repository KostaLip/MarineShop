package com.marine_shop.shop_backend.controllers;

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

import com.marine_shop.shop_backend.dto.ImageRequest;
import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.ProductImage;
import com.marine_shop.shop_backend.services.ProductImageService;
import com.marine_shop.shop_backend.services.ProductService;

@CrossOrigin
@RestController
public class ProductImageController {

	@Autowired
	private ProductImageService service;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/productImage")
	public List<ProductImage> getAllProductImages() {
		return service.getAll();
	}
	
	@GetMapping("/productImage/{id}")
	public ResponseEntity<?> getProductImageById(@PathVariable int id) {
		Optional<ProductImage> productImage = service.findById(id);
		if(productImage.isPresent()) {
			return ResponseEntity.ok(productImage.get());
		}
		return ResponseEntity.status(404).body("Product image with required ID: " + id + " does not exist");
	}
	
	@PostMapping("/productImage")
	public ResponseEntity<?> createProductImage(@RequestBody ImageRequest request) {
		Product product = productService.findById(request.getProductId())
		        .orElseThrow(() -> new RuntimeException("Product not found"));
		ProductImage image = new ProductImage();
		image.setProduct(product);
		image.setImageUrl(request.getImageUrl());
		return ResponseEntity.ok(service.create(image));
	}
	
	@PutMapping("/productImage/id/{id}")
	public ResponseEntity<?> updateProductImage(@RequestBody ImageRequest request, @PathVariable int id) {
		Optional<ProductImage> updateImage = service.findById(id);
		if(updateImage.isEmpty()) {
			return ResponseEntity.status(404).body("Product image with required ID: " + id + " cold not be deleted because it does not exist");
		}
		ProductImage image = updateImage.get();
		Optional<Product> updateProduct = productService.findById(request.getProductId());
		if(updateProduct.isPresent()) {
			image.setProduct(updateProduct.get());
		}
		image.setImageUrl(request.getImageUrl());
		return ResponseEntity.ok(service.update(image, id));
	}
	
	@DeleteMapping("/productImage/id/{id}")
	public ResponseEntity<?> deleteProductImage(@PathVariable int id) {
		if(service.existsById(id)) {
			service.delete(id);
			return ResponseEntity.ok("Product image with ID: " + id + " has been successfully deleted");
		}
		return ResponseEntity.status(404).body("Prodcut image with required ID: " + id + " cold not be deleted because it does not exist");
	}
	
	@GetMapping("/productImage/product/{id}")
	public ResponseEntity<?> getImagesByProduct(@PathVariable int id) {
		Optional<Product> getProduct = productService.findById(id);
		if(getProduct.isEmpty()) {
			return ResponseEntity.status(404).body("Product with required ID: " + id + " does not exist");
		}
		Product product = getProduct.get();
		return ResponseEntity.ok(service.findByProduct(product));
	}
	
}
