package com.example.hotel.service;

import com.example.hotel.model.Room;

import java.util.List;
import java.util.Map;

public interface RoomService {

    List<Room> getAvailableRooms();

    Map<String, Integer> getAvailableRoomsByHotel();

}
