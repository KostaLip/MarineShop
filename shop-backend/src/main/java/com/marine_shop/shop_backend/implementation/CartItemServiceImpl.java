package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.CartItem;
import com.marine_shop.shop_backend.repository.CartItemRepository;
import com.marine_shop.shop_backend.services.CartItemService;

@Component
public class CartItemServiceImpl implements CartItemService{

	@Autowired
	private CartItemRepository repo;

	@Override
	public List<CartItem> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<CartItem> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public CartItem create(CartItem t) {
		return repo.save(t);
	}

	@Override
	public Optional<CartItem> update(CartItem t, int id) {
		if(repo.existsById(id)) {
			t.setCartItemID(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

}
