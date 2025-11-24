package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.Cart;
import com.marine_shop.shop_backend.repository.CartRepository;
import com.marine_shop.shop_backend.services.CartService;

@Component
public class CartServiceImpl implements CartService{

	@Autowired
	private CartRepository repo;

	@Override
	public List<Cart> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<Cart> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public Cart create(Cart t) {
		return repo.save(t);
	}

	@Override
	public Optional<Cart> update(Cart t, int id) {
		if(repo.existsById(id)) {
			t.setCartID(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}
	
	
	
}
