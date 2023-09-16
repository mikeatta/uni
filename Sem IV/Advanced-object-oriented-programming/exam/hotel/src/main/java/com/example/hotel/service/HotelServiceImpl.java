package com.example.hotel.service;

import com.example.hotel.model.Hotel;
import com.example.hotel.repo.HotelRepo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HotelServiceImpl implements HotelService {

    private final HotelRepo hotelRepo;

    public HotelServiceImpl(HotelRepo hotelRepo) {
        this.hotelRepo = hotelRepo;
    }

    @Override
    public Map<String, Integer> getTotalRoomsByHotel() {
        List<Hotel> hotels = hotelRepo.findAllHotelsWithRooms();
        Map<String, Integer> totalRoomsByHotel = new HashMap<>();

        for (Hotel hotel : hotels) {
            totalRoomsByHotel.put(hotel.getName(), hotel.getRooms().size());
        }

        return totalRoomsByHotel;
    }
}
