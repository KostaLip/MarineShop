package com.marine_shop.shop_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.Review;
import com.marine_shop.shop_backend.models.User;

@Service
public interface ReviewService extends CrudService<Review>{

    List<Review> findByProduct(Product product);
    Optional<Review> findByUserAndProduct(User user, Product product);
    //List<Review> findByProductOrderByDateCreatedDesc(Product product);
    //List<Review> findByProductOrderByRatingDesc(Product product);
	
}
