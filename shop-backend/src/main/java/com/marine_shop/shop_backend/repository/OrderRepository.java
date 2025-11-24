package com.marine_shop.shop_backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Order;
import com.marine_shop.shop_backend.models.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{

	Optional<Order> findByStripeSessionId(String stripeSessionId);
    List<Order> findByUser(User user);
    List<Order> findByUser_UserID(int userID);
    List<Order> findByStatus(String status);
    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Order> findByOrderDateAfter(LocalDateTime date);
    List<Order> findByOrderDateBefore(LocalDateTime date);
    List<Order> findByUserAndStatus(User user, String status);
    List<Order> findByUserOrderByOrderDateDesc(User user);
    List<Order> findByStatusOrderByOrderDateDesc(String status);
    List<Order> findAllByOrderByOrderDateDesc();
    List<Order> findByTotalPriceBetween(double minPrice, double maxPrice);
    List<Order> findByTotalPriceGreaterThan(double minPrice);
    List<Order> findByTotalPriceLessThan(double maxPrice);
	
}
