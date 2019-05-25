package com.example.entrees.repository;

import com.example.entrees.model.ReviewToUser;
//import com.example.entrees.model.ChoiceVoteCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewToUserRepository extends JpaRepository<ReviewToUser, Long> {
    @Query("SELECT v FROM ReviewToUser v where v.user.id = :userId and v.entree.id in :entreeIds")
    List<ReviewToUser> findByUserIdAndEntreeIdIn(@Param("userId") Long userId, @Param("entreeIds") List<Long> entreeIds);

    @Query("SELECT v FROM ReviewToUser v where v.user.id = :userId and v.entree.id = :entreeId")
    ReviewToUser findByUserIdAndEntreeId(@Param("userId") Long userId, @Param("entreeId") Long entreeId);

    @Query("SELECT COUNT(v.id) from ReviewToUser v where v.user.id = :userId")
    long countByUserId(@Param("userId") Long userId);

    @Query("SELECT v.entree.id FROM ReviewToUser v WHERE v.user.id = :userId")
    Page<Long> findReviewedEntreeIdsByUserId(@Param("userId") Long userId, Pageable pageable);
}