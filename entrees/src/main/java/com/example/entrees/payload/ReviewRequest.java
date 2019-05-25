package com.example.entrees.payload;

import javax.validation.constraints.*;

public class ReviewRequest {
    @NotBlank
    @Size(max = 40)
    private String text;

    @Min(1)
    @Max(5)
    private int rating;

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

}