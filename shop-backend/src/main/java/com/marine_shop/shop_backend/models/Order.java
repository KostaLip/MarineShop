package com.marine_shop.shop_backend.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "orders")
public class Order implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private int orderID;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(name = "order_date")
	private LocalDateTime orderDate;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private OrderStatus status;
	
	@Column(name = "total_price")
	private double totalPrice;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<OrderItem> items;
	
	@Column(name = "shipping_country")
	private String shippingCountry;

	@Column(name = "shipping_city") 
	private String shippingCity;

	@Column(name = "shipping_address")
	private String shippingAddress;

	@Column(name = "stripe_session_id")
	private String stripeSessionId;
	
	public enum OrderStatus {
	    PENDING, PAID, CANCELLED
	}
	public Order() {
		
	}
	
	public Order(LocalDateTime orderDate, OrderStatus status, double totalPrice) {
		super();
		this.orderDate = orderDate;
		this.status = status;
		this.totalPrice = totalPrice;
	}

	public int getOrderID() {
		return orderID;
	}

	public void setOrderID(int orderID) {
		this.orderID = orderID;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public String getShippingCountry() {
		return shippingCountry;
	}

	public void setShippingCountry(String shippingCountry) {
		this.shippingCountry = shippingCountry;
	}

	public String getShippingCity() {
		return shippingCity;
	}

	public void setShippingCity(String shippingCity) {
		this.shippingCity = shippingCity;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public String getStripeSessionId() {
		return stripeSessionId;
	}

	public void setStripeSessionId(String stripeSessionId) {
		this.stripeSessionId = stripeSessionId;
	}
	
}
