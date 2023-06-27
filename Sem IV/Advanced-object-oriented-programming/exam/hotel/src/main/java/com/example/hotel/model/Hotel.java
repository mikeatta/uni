package com.example.hotel.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hotel")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private int totalRooms;
}
