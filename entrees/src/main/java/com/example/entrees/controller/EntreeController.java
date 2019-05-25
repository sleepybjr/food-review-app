package com.example.entrees.controller;

import com.example.entrees.payload.*;
import com.example.entrees.security.CurrentUser;
import com.example.entrees.security.UserPrincipal;
import com.example.entrees.service.EntreeService;
import com.example.entrees.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/entrees")
public class EntreeController {

    @Autowired
    private EntreeService entreeService;

    private static final Logger logger = LoggerFactory.getLogger(EntreeController.class);

    @GetMapping
    public PagedResponse<EntreeResponse> getEntrees(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return entreeService.getAllEntrees(currentUser, page, size);
    }

    @GetMapping("/{entreeId}")
    public EntreeResponse getEntreeById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long entreeId) {
        return entreeService.getEntreeById(entreeId, currentUser);
    }

    @PostMapping("/{entreeId}/review")
    @PreAuthorize("hasRole('USER')")
    public EntreeResponse addReview(@CurrentUser UserPrincipal currentUser,
                                           @PathVariable Long entreeId,
                                           @Valid @RequestBody ReviewRequest reviewRequest) {
        return entreeService.addReview(entreeId, reviewRequest, currentUser);
    }

}