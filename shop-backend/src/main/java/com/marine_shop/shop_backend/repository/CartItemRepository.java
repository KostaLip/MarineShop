package com.marine_shop.shop_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Cart;
import com.marine_shop.shop_backend.models.CartItem;
import com.marine_shop.shop_backend.models.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer>{

    List<CartItem> findByCart(Cart cart);
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
    List<CartItem> findByProduct(Product product);
    void deleteByCart(Cart cart);
    List<CartItem> findByQuantityGreaterThan(Integer quantity);
    //List<CartItem> findByCartOrderByCreatedDateDesc(Cart cart);
    
}
