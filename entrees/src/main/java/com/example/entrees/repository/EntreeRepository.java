package com.example.entrees.repository;

import com.example.entrees.model.Entree;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EntreeRepository extends JpaRepository<Entree, Long> {
    Optional<Entree> findById(Long entreeId);

    Page<Entree> findByCreatedBy(Long userId, Pageable pageable);

    Page<Entree> findByRestaurantId(Long restaurantId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<Entree> findByIdIn(List<Long> entreeIds);

    List<Entree> findByIdIn(List<Long> entreeIds, Sort sort);
}
