package com.example.entrees.payload;

import javax.validation.constraints.*;

public class ReviewToUserRequest {
    @NotBlank
    @Size(max = 40)
    private String text;

    @Min(1)
    @Max(5)
    private int rating;

    @NotNull
    private Long entreeId;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Long getEntreeId() {
        return entreeId;
    }

    public void setEntreeId(Long entreeId) {
        this.entreeId = entreeId;
    }
}