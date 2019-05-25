package com.example.entrees.repository;

import com.example.entrees.model.Entree;
import com.example.entrees.model.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findById(Long restaurantId);

    Page<Restaurant> findByCreatedBy(Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<Restaurant> findByIdIn(List<Long> restaurantIds);

    List<Restaurant> findByIdIn(List<Long> restaurantIds, Sort sort);
}
