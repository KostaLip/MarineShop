package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.Review;
import com.marine_shop.shop_backend.models.User;
import com.marine_shop.shop_backend.repository.ReviewRepository;
import com.marine_shop.shop_backend.services.ReviewService;

@Component
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	private ReviewRepository repo;

	@Override
	public List<Review> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<Review> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public Review create(Review t) {
		return repo.save(t);
	}

	@Override
	public Optional<Review> update(Review t, int id) {
		if(repo.existsById(id)) {
			t.setReviewID(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

	@Override
	public List<Review> findByProduct(Product product) {
		return repo.findByProduct(product);
	}

	@Override
	public Optional<Review> findByUserAndProduct(User user, Product product) {
		return repo.findByUserAndProduct(user, product);
	}
	
}
