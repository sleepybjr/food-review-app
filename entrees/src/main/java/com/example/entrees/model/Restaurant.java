package com.example.entrees.model;

import com.example.entrees.model.audit.UserDateAudit;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "restaurants", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "name"
        })
})
public class Restaurant extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Size(max = 500)
    private String description;

    @OneToMany(
            mappedBy = "restaurant",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    private List<Entree> entrees = new ArrayList<>();

    public Restaurant() {
    }

    public Restaurant(String name, String description, List<Entree> entrees) {
        this.name = name;
        this.description = description;
        this.entrees = entrees;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public List<Entree> getEntrees() {
        return entrees;
    }

    public void setEntrees(List<Entree> entrees) {
        this.entrees = entrees;
    }

    public void addEntree(Entree entree) {
        entrees.add(entree);
        entree.setRestaurant(this);
    }

    public void removeEntree(Entree entree) {
        entrees.remove(entree);
        entree.setRestaurant(null);
    }
}