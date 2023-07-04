package com.example.hotel.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private Date checkInDate;

    @Column
    private Date checkOutDate;

    @Column
    private int people;
}
