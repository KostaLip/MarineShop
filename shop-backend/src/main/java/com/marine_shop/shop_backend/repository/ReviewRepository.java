package com.marine_shop.shop_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.Product;
import com.marine_shop.shop_backend.models.Review;
import com.marine_shop.shop_backend.models.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer>{

    List<Review> findByProduct(Product product);
    List<Review> findByUser(User user);
    Optional<Review> findByUserAndProduct(User user, Product product);
    boolean existsByUserAndProduct(User user, Product product);
    List<Review> findByRating(int rating);
    List<Review> findByRatingGreaterThanEqual(int rating);
    List<Review> findByRatingLessThanEqual(int rating);
    List<Review> findByRatingBetween(int minRating, int maxRating);
    List<Review> findByProductOrderByDateCreatedDesc(Product product);
    List<Review> findByProductOrderByRatingDesc(Product product);
    List<Review> findByUserOrderByDateCreatedDesc(User user);
	
}
