package com.example.hotel.service;

import com.example.hotel.model.Reservation;
import com.example.hotel.repo.ReservationRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepo reservationRepo;

    public ReservationServiceImpl(ReservationRepo reservationRepo) {
        this.reservationRepo = reservationRepo;
    }

    @Override
    public List<Reservation> findAllReservations() {
        return reservationRepo.findAll();
    }

    @Override
    public void saveReservation(Reservation reservation) {
        reservationRepo.save(reservation);
    }

}
