package com.example.hotel.service;

import com.example.hotel.repo.RoomRepo;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoomServiceImpl implements RoomService{

    private final RoomRepo roomRepo;

    public RoomServiceImpl(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    @Override
    public Map<String, Integer> getAvailableRoomsByHotel() {
        List<Object[]> rooms = roomRepo.findAvailableHotelRooms();
        Map<String, Integer> availableRoomsByHotel = new LinkedHashMap<>();

        for (Object[] room : rooms) {
            String locationName = (String) room[0];
            Integer availableRooms = ((Number) room[1]).intValue();
            availableRoomsByHotel.put(locationName, availableRooms);
        }

        return availableRoomsByHotel;
    }

}
