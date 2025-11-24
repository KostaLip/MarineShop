package com.marine_shop.shop_backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.marine_shop.shop_backend.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);
	List<User> findByIsAdminTrue();
	List<User> findByIsAdminFalse();
	List<User> findByFirstName(String firstName);
	List<User> findByLastName(String lastName);
	List<User> findByFirstNameAndLastName(String firstName, String lastName);
	List<User> findByFirstNameContainingIgnoreCase(String firstName);
	Optional<User> findByPhone(String phone);
	boolean existsByPhone(String Phone);
	List<User> findByDateCreatedAfter(LocalDateTime date);
	List<User> findByDateCreatedBefore(LocalDateTime date);
	List<User> findByDateCreatedBetween(LocalDateTime start, LocalDateTime end);
	
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.dateCreated >= :date")
	int countUsersCreatedSince(@Param("date") LocalDateTime date);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.dateCreated <= :date")
	int countUsersCreatedBefore(@Param("date") LocalDateTime date);
	
}
