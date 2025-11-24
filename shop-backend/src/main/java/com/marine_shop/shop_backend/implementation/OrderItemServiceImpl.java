package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.OrderItem;
import com.marine_shop.shop_backend.repository.OrderItemRepository;
import com.marine_shop.shop_backend.services.OrderItemService;

@Component
public class OrderItemServiceImpl implements OrderItemService{

	@Autowired
	private OrderItemRepository repo;

	@Override
	public List<OrderItem> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<OrderItem> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public OrderItem create(OrderItem t) {
		return repo.save(t);
	}

	@Override
	public Optional<OrderItem> update(OrderItem t, int id) {
		if(repo.existsById(id)) {
			t.setOrderItemID(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}
	
	
	
}
