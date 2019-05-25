package com.example.entrees.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RestaurantRequest {
    @NotBlank
    @Size(max = 140)
    private String name;

    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}