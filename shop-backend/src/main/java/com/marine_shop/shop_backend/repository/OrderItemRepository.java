package com.marine_shop.shop_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Order;
import com.marine_shop.shop_backend.models.OrderItem;
import com.marine_shop.shop_backend.models.Product;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>{

    List<OrderItem> findByOrder(Order order);
    List<OrderItem> findByProduct(Product product);
    Optional<OrderItem> findByOrderAndProduct(Order order, Product product);
    void deleteByOrder(Order order);
    boolean existsByOrderAndProduct(Order order, Product product);
    List<OrderItem> findByOrderOrderByPriceDesc(Order order);
    List<OrderItem> findByOrderOrderByQuantityDesc(Order order);
	
}
