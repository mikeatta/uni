package com.example.hotel.service;

import com.example.hotel.repo.HotelRepo;
import org.springframework.stereotype.Service;

@Service
public class HotelServiceImpl implements HotelService {

    private final HotelRepo hotelRepo;

    public HotelServiceImpl(HotelRepo hotelRepo) {
        this.hotelRepo = hotelRepo;
    }

    @Override
    public Integer getTotalRooms() {
        Integer totalRooms = hotelRepo.getTotalRoomCount();
        return totalRooms != null ? totalRooms : 0;
    }
}
