package com.marine_shop.shop_backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marine_shop.shop_backend.models.Order;
import com.marine_shop.shop_backend.models.Order.OrderStatus;
import com.marine_shop.shop_backend.models.User;
import com.marine_shop.shop_backend.repository.OrderRepository;
import com.marine_shop.shop_backend.services.OrderService;
import com.marine_shop.shop_backend.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@GetMapping("/order/admin")
	public ResponseEntity<?> getAllOrders() {
		return ResponseEntity.ok(orderService.getAll());
	}
	
	@GetMapping("/order/{orderID}")
	public ResponseEntity<?> getOrderById(@PathVariable int orderID) {
		return ResponseEntity.ok(orderService.findById(orderID));
	}
	
	@GetMapping("/order/user/{userID}")
	public ResponseEntity<?> getOrdersByUser(@PathVariable int userID) {
		return ResponseEntity.ok(orderService.findByUser_UserID(userID));
	}
	
	@PutMapping("/order/{orderID}/status")
    public Order updateOrderStatus(@PathVariable int orderID, @RequestBody String status) {
        return orderService.updateStatus(orderID, OrderStatus.valueOf(status));
    }
	
	@PutMapping("/order/admin/id/{orderId}")
	public ResponseEntity<Order> updateOrder(@PathVariable int orderId, @RequestBody Order orderData) {
	    Order order = orderService.findById(orderId).orElseThrow();
	    order.setStatus(orderData.getStatus());
	    order.setShippingCountry(orderData.getShippingCountry());
	    order.setShippingCity(orderData.getShippingCity());
	    order.setShippingAddress(orderData.getShippingAddress());
	    Order savedOrder = orderRepository.save(order);
	    return ResponseEntity.ok(savedOrder);
	}
	
	@DeleteMapping("/order/admin/id/{orderId}")
	public ResponseEntity<?> deleteOrder(@PathVariable int orderId) {
		orderService.delete(orderId);
		return ResponseEntity.ok().build();
	}
	
}
