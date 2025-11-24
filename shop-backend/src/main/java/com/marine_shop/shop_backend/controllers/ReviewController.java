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

import com.marine_shop.shop_backend.dto.ReviewRequset;
import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.Review;
import com.marine_shop.shop_backend.models.User;
import com.marine_shop.shop_backend.services.ProductService;
import com.marine_shop.shop_backend.services.ReviewService;
import com.marine_shop.shop_backend.services.UserService;

@CrossOrigin
@RestController
public class ReviewController {
	
	@Autowired
	private ReviewService service;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private UserService userService;

	@GetMapping("/review")
	public List<Review> getAllReviews() {
		return service.getAll();
	}
	
	@GetMapping("/review/{id}")
	public ResponseEntity<?> getReviewById(@PathVariable int id) {
		Optional<Review> review = service.findById(id);
		if(review.isPresent()) {
			return ResponseEntity.ok(review.get());
		}
		return ResponseEntity.status(404).body("Review with required ID: " + id + " does not exist");
	}
	
	@PostMapping("/review")
	public ResponseEntity<?> createReview(@RequestBody ReviewRequset request) {
		Product product = productService.findById(request.getProductId())
		        .orElseThrow(() -> new RuntimeException("Product not found"));
		User user = userService.findById(request.getUserId())
				.orElseThrow(() -> new RuntimeException("User not found"));
		Review review = new Review();
		review.setProduct(product);
		review.setUser(user);
		review.setRating(request.getRating());
		review.setReviewComment(request.getReviewComment());
		return ResponseEntity.ok(service.create(review));
	}
	
	@PutMapping("/review/id/{id}")
	public ResponseEntity<?> updateProductImage(@RequestBody ReviewRequset request, @PathVariable int id) {
		Optional<Review> updateReview = service.findById(id);
		if(updateReview.isEmpty()) {
			return ResponseEntity.status(404).body("Review with required ID: " + id + " cold not be deleted because it does not exist");
		}
		Review review = updateReview.get();
		Optional<Product> updateProduct = productService.findById(request.getProductId());
		if(updateProduct.isEmpty()) {
			return ResponseEntity.status(404).body("Product with required ID: " + id + " cold not be deleted because it does not exist");
		}
		Optional<User> updateUser = userService.findById(request.getUserId());
		if(updateUser.isEmpty()) {
			return ResponseEntity.status(404).body("User with required ID: " + id + " cold not be deleted because it does not exist");
		}
		review.setProduct(updateProduct.get());
		review.setUser(updateUser.get());
		review.setRating(request.getRating());
		review.setReviewComment(request.getReviewComment());
		return ResponseEntity.ok(service.update(review, id));
	}
	
	@DeleteMapping("/review/id/{id}")
	public ResponseEntity<?> deleteReview(@PathVariable int id) {
		if(service.existsById(id)) {
			service.delete(id);
			return ResponseEntity.ok("Review with ID: " + id + " has been successfully deleted");
		}
		return ResponseEntity.status(404).body("Review with required ID: " + id + " cold not be deleted because it does not exist");
	}
	
	@GetMapping("/review/product/{id}")
	private ResponseEntity<?> getReviewsByProduct(@PathVariable int id) {
		Optional<Product> product = productService.findById(id);
		if(product.isEmpty()) {
			return ResponseEntity.status(404).body("Product with required ID: " + id + " does not exist");
		}
		return ResponseEntity.ok(service.findByProduct(product.get()));
	}
	
	@GetMapping("/review/product/{productId}/user/{userId}")
	private ResponseEntity<?> getReviewsByProductAndUser(@PathVariable int productId, @PathVariable int userId) {
		Optional<Product> product = productService.findById(productId);
		if(product.isEmpty()) {
			return ResponseEntity.status(404).body("Product with required ID: " + productId + " does not exist");
		}
		Optional<User> user = userService.findById(userId);
		if(user.isEmpty()) {
			return ResponseEntity.status(404).body("User with required ID: " + userId + " does not exist");
		}
		return ResponseEntity.ok(service.findByUserAndProduct(user.get(), product.get()));
	}
	
}
