package com.example.entrees.service;

import com.example.entrees.exception.BadRequestException;
import com.example.entrees.exception.ResourceNotFoundException;
import com.example.entrees.model.*;
import com.example.entrees.payload.*;
import com.example.entrees.repository.*;
import com.example.entrees.util.AppConstants;
import com.example.entrees.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private EntreeRepository entreeRepository;

    @Autowired
    private EntreeService entreeService;

    private static final Logger logger = LoggerFactory.getLogger(RestaurantService.class);

    public PagedResponse<RestaurantResponse> getAllRestaurants(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Restaurant> restaurants = restaurantRepository.findAll(pageable);

        if (restaurants.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), restaurants.getNumber(),
                    restaurants.getSize(), restaurants.getTotalElements(), restaurants.getTotalPages(), restaurants.isLast());
        }

        List<RestaurantResponse> restaurantResponses = restaurants.map(restaurant -> {
            return ModelMapper.mapRestaurantToRestaurantResponse(restaurant);
        }).getContent();

        return new PagedResponse<>(restaurantResponses, restaurants.getNumber(),
                restaurants.getSize(), restaurants.getTotalElements(), restaurants.getTotalPages(), restaurants.isLast());
    }

    public Restaurant createRestaurant(RestaurantRequest restaurantRequest) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(restaurantRequest.getName());
        restaurant.setDescription(restaurantRequest.getDescription());

        return restaurantRepository.save(restaurant);
    }

    public RestaurantResponse getRestaurantById(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(
                () -> new ResourceNotFoundException("Restaurant", "id", restaurantId));

        return ModelMapper.mapRestaurantToRestaurantResponse(restaurant);
    }

    public void deleteRestaurantById(Long restaurantId) {
        restaurantRepository.deleteById(restaurantId);
    }

    public PagedResponse<EntreeResponse> getEntreesByRestaurantId(Long restaurantId, int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Entree> entrees = entreeRepository.findByRestaurantId(restaurantId, pageable);

        if (entrees.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), entrees.getNumber(),
                    entrees.getSize(), entrees.getTotalElements(), entrees.getTotalPages(), entrees.isLast());
        }

        Map<Long, User> creatorMap = entreeService.getEntreeCreatorMap(entrees.getContent());
        List<EntreeResponse> entreeResponses = entrees.map(entree -> {
            return ModelMapper.mapEntreeToEntreeResponse(entree, creatorMap.get(entree.getCreatedBy()), entreeService.getReviewCreatorMap(entree.getReviews()));
        }).getContent();

        return new PagedResponse<>(entreeResponses, entrees.getNumber(),
                entrees.getSize(), entrees.getTotalElements(), entrees.getTotalPages(), entrees.isLast());
    }

    public Entree createEntree(Long restaurantId, EntreeRequest entreeRequest) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(
                () -> new ResourceNotFoundException("Restaurant", "id", restaurantId));

        Entree entree = new Entree();
        entree.setName(entreeRequest.getName());
        entree.setDescription(entreeRequest.getDescription());
        entree.setRestaurant(restaurant);

        return entreeRepository.save(entree);
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
