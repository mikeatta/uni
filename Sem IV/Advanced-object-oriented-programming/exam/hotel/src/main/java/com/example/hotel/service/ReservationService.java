package com.example.hotel.service;

import com.example.hotel.model.Reservation;

import java.util.List;

public interface ReservationService {

    List<Reservation> findAllReservations();

}
