package com.example.hotel.service;

import com.example.hotel.model.Hotel;
import com.example.hotel.repo.HotelRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HotelServiceImpl implements HotelService {

    private final HotelRepo hotelRepo;

    public HotelServiceImpl(HotelRepo hotelRepo) {
        this.hotelRepo = hotelRepo;
    }

    @Override
    public int getTotalRooms() {
        Optional<Hotel> hotel = hotelRepo.findById(0L);
        return hotel.map(Hotel::getTotalRooms).orElse(0);
    }
}
