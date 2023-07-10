package com.example.hotel.service;

import com.example.hotel.model.Room;
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
    public List<Room> getAvailableRooms() {
        return roomRepo.findAvailableHotelRooms();
    }

    @Override
    public Map<String, Integer> getAvailableRoomsByHotel() {
        List<Room> rooms = roomRepo.findAvailableHotelRooms();
        Map<String, Integer> availableRoomsByHotel = new LinkedHashMap<>();

        for (Room room : rooms) {
            String locationName = room.getHotel().getName();
            Integer availableRooms = room.getCapacity();
            availableRoomsByHotel.put(locationName, availableRooms);
        }

        return availableRoomsByHotel;
    }

}
