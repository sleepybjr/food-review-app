package com.example.entrees.util;

import com.example.entrees.model.Entree;
import com.example.entrees.model.Restaurant;
import com.example.entrees.model.Review;
import com.example.entrees.model.User;
import com.example.entrees.payload.EntreeResponse;
import com.example.entrees.payload.RestaurantResponse;
import com.example.entrees.payload.ReviewResponse;
import com.example.entrees.payload.UserSummary;
import com.example.entrees.service.EntreeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ModelMapper {

    public static EntreeResponse mapEntreeToEntreeResponse(Entree entree, User creator, Map<Long, User> reviewCreatorMap) {
        EntreeResponse entreeResponse = new EntreeResponse();
        entreeResponse.setId(entree.getId());
        entreeResponse.setName(entree.getName());
        entreeResponse.setDescription(entree.getDescription());
        entreeResponse.setCreationDateTime(entree.getCreatedAt());

        if (reviewCreatorMap != null) {
            List<ReviewResponse> reviewResponses = entree.getReviews().stream().map(review -> {
                return mapReviewToReviewResponse(review, reviewCreatorMap.get(review.getCreatedBy()));
            }).collect(Collectors.toList());
            entreeResponse.setReviews(reviewResponses);
        }

        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        entreeResponse.setCreatedBy(creatorSummary);

        return entreeResponse;
    }

    public static ReviewResponse mapReviewToReviewResponse(Review review, User creator) {
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.setId(review.getId());
        reviewResponse.setText(review.getText());
        reviewResponse.setRating(review.getRating());
        reviewResponse.setEntreeId(review.getEntree().getId());
        reviewResponse.setCreationDateTime(review.getCreatedAt());
        UserSummary creatorSummary = new UserSummary(review.getId(), creator.getUsername(), creator.getName());
        reviewResponse.setCreatedBy(creatorSummary);

        return reviewResponse;
    }

    public static RestaurantResponse mapRestaurantToRestaurantResponse(Restaurant restaurant) {
        RestaurantResponse restaurantResponse = new RestaurantResponse();
        restaurantResponse.setId(restaurant.getId());
        restaurantResponse.setName(restaurant.getName());
        restaurantResponse.setDescription(restaurant.getDescription());

        return restaurantResponse;
    }
}