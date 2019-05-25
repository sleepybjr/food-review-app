package com.example.entrees.payload;

import java.time.Instant;

public class ReviewResponse {
    private long id;
    private String text;
    private int rating;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private long entreeId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public long getEntreeId() {
        return entreeId;
    }

    public void setEntreeId(long entreeId) {
        this.entreeId = entreeId;
    }
}