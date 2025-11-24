package com.marine_shop.shop_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.marine_shop.shop_backend.models.Category;

@Service
public interface CategoryService extends CrudService<Category>{

    List<Category> searchByName(String name);
    List<Category> findCategoriesWithProducts();
    List<Category> findCategoriesWithoutProducts();
    
}
