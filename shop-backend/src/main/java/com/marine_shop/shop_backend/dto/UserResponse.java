package com.marine_shop.shop_backend.dto;

import com.marine_shop.shop_backend.models.User;

public class UserResponse {
	
	 private int userId;
	 private String firstName;
	 private String lastName;
	 private String email;
	 private String phone;
	 private boolean isAdmin;
	    
	 public UserResponse(User user) {
		 this.userId = user.getUserID();
		 this.firstName = user.getFirstName();
		 this.lastName = user.getLastName();
		 this.email = user.getEmail();
		 this.phone = user.getPhone();
		 this.isAdmin = user.isAdmin();
	    }

	 public int getUserId() {
		 return userId;
	 }

	 public void setUserId(int userId) {
		 this.userId = userId;
	 }

	 public String getFirstName() {
		 return firstName;
	 }

	 public void setFirstName(String firstName) {
		 this.firstName = firstName;
	 }

	 public String getLastName() {
		 return lastName;
	 }

	 public void setLastName(String lastName) {
		 this.lastName = lastName;
	 }

	 public String getEmail() {
		 return email;
	 }

	 public void setEmail(String email) {
		 this.email = email;
	 }

	 public String getPhone() {
		 return phone;
	 }

	 public void setPhone(String phone) {
		 this.phone = phone;
	 }

	 public boolean isAdmin() {
		 return isAdmin;
	 }

	 public void setAdmin(boolean isAdmin) {
		 this.isAdmin = isAdmin;
	 }
	 
}
