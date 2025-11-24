package com.marine_shop.shop_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.marine_shop.shop_backend.dto.LoginRequest;
import com.marine_shop.shop_backend.models.User;

@Service
public interface UserService extends CrudService<User>{
	
	Optional<User> findByEmail(String email);
	List<User> findByFirstName(String firstName);
	List<User> findByLastName(String lastName);
	List<User> findByIsAdminTrue();
	List<User> findByIsAdminFalse();
	List<User> findByFirstNameAndLastName(String firstName, String lastName);
	User login(LoginRequest loginRequest);
	User signup(User request);
	
}
