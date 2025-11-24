package com.marine_shop.shop_backend.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_images")
public class ProductImage implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_image_id")
	private int productImageID;
	
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	public ProductImage() {
		
	}
	
	public ProductImage(String imageUrl) {
		super();
		this.imageUrl = imageUrl;
	}

	public int getProductImageID() {
		return productImageID;
	}

	public void setProductImageID(int productImageID) {
		this.productImageID = productImageID;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
}
