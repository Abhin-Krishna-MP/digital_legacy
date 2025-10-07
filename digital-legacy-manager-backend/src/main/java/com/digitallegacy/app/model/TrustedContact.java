package com.digitallegacy.app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trusted_contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrustedContact {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;

    private String address; // New field for address

    @ManyToOne
    private User owner;
    public void setOwner(User owner) {
        this.owner = owner;
    }

    public User getOwner() {
        return this.owner;
    }
}
