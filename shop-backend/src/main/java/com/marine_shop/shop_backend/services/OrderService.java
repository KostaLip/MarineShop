package com.marine_shop.shop_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.marine_shop.shop_backend.models.Order;
import com.marine_shop.shop_backend.models.User;
import com.marine_shop.shop_backend.models.Order.OrderStatus;

@Service
public interface OrderService extends CrudService<Order>{
    List<Order> findByUser(User user);
	public Order updateStatus(int orderId, OrderStatus newStatus);
    List<Order> findByUser_UserID(int userID);
}
