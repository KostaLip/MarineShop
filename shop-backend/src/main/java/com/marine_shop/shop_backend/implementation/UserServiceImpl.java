package com.marine_shop.shop_backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.marine_shop.shop_backend.dto.LoginRequest;
import com.marine_shop.shop_backend.models.User;
import com.marine_shop.shop_backend.repository.UserRepository;
import com.marine_shop.shop_backend.services.UserService;

@Component
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public List<User> getAll() {
		return repo.findAll();
	}

	@Override
	public boolean existsById(int id) {
		return repo.existsById(id);
	}

	@Override
	public Optional<User> findById(int id) {
		return repo.findById(id);
	}

	@Override
	public User create(User t) {
		t.setPasswordHash(passwordEncoder.encode(t.getPasswordHash()));
		return repo.save(t);
	}

	@Override
	public Optional<User> update(User t, int id) {
		Optional<User> existingUserOpt = repo.findById(id);
	    
	    if(existingUserOpt.isPresent()) {
	        User existingUser = existingUserOpt.get();
	        
	        existingUser.setFirstName(t.getFirstName());
	        existingUser.setLastName(t.getLastName());
	        existingUser.setEmail(t.getEmail());
	        existingUser.setPhone(t.getPhone());
	        existingUser.setAdmin(t.isAdmin());
	        
	        if (t.getPasswordHash() != null && !t.getPasswordHash().isEmpty()) {
	            existingUser.setPasswordHash(passwordEncoder.encode(t.getPasswordHash()));
	        }
	        return Optional.of(repo.save(existingUser));
	    }
	    return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);
	}

	@Override
	public Optional<User> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	@Override
	public List<User> findByFirstName(String firstName) {
		return repo.findByFirstName(firstName);
	}
	
	@Override
	public List<User> findByLastName(String lastName) {
		return repo.findByLastName(lastName);
	}

	@Override
	public List<User> findByIsAdminTrue() {
		return repo.findByIsAdminTrue();
	}
	
	@Override
	public List<User> findByIsAdminFalse() {
		return repo.findByIsAdminFalse();
	}

	@Override
	public List<User> findByFirstNameAndLastName(String firstName, String lastName) {
		return repo.findByFirstNameAndLastName(firstName, lastName);
	}
	
	public User login(LoginRequest loginRequest) {
		Optional<User> userOpt = repo.findByEmail(loginRequest.getEmail());
        if(userOpt.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), userOpt.get().getPasswordHash())) {
            return userOpt.get();
        }
        throw new BadCredentialsException("Invalid email or password");
	}
	
	public User signup(User request) {
        if(repo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setAdmin(false);
        user.setPasswordHash(passwordEncoder.encode(request.getPasswordHash()));
        return repo.save(user);
    }

}
