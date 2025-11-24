package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.models.Order;
import com.marine_shop.shop_backend.models.Order.OrderStatus;
import com.marine_shop.shop_backend.models.User;
import com.marine_shop.shop_backend.repository.OrderRepository;
import com.marine_shop.shop_backend.services.OrderService;

@Component
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderRepository repo;

	@Override
	public List<Order> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<Order> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public Order create(Order t) {
		return repo.save(t);
	}

	@Override
	public Optional<Order> update(Order t, int id) {
		if(repo.existsById(id)) {
			t.setOrderID(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

	@Override
	public List<Order> findByUser(User user) {
		return repo.findByUser(user);
	}
	
	@Override
	public Order updateStatus(int orderId, OrderStatus newStatus) {
        Optional<Order> optionalOrder = repo.findById(orderId);
        
        if (optionalOrder.isEmpty()) {
            throw new RuntimeException("Order sa ID " + orderId + " nije pronađen");
        }
        
        Order order = optionalOrder.get();
        
        order.setStatus(newStatus);
        
        return repo.save(order);
    }

	@Override
	public List<Order> findByUser_UserID(int userID) {
		return repo.findByUser_UserID(userID);
	}
	
}
