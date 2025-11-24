package com.marine_shop.shop_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Cart;
import com.marine_shop.shop_backend.models.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{

    Optional<Cart> findByUser(User user);
    boolean existsByUser(User user);
    
    @Query("SELECT c FROM Cart c WHERE SIZE(c.items) > 0")
    List<Cart> findCartsWithItems();
    
    @Query("SELECT c FROM Cart c WHERE SIZE(c.items) = 0")
    List<Cart> findEmptyCarts();
	
}
