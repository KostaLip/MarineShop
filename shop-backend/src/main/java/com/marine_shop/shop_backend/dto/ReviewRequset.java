package com.marine_shop.shop_backend.dto;

public class ReviewRequset {

	private int productId;
	private int userId;
	private int rating;
	private String reviewComment;
	
	public int getProductId() {
		return productId;
	}
	
	public void setProductId(int productId) {
		this.productId = productId;
	}
	
	public int getUserId() {
		return userId;
	}
	
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public int getRating() {
		return rating;
	}
	
	public void setRating(int rating) {
		this.rating = rating;
	}
	
	public String getReviewComment() {
		return reviewComment;
	}
	
	public void setReviewComment(String reviewComment) {
		this.reviewComment = reviewComment;
	}
	
}
