package com.example.hotel.repo;

import com.example.hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepo extends JpaRepository<Room, Long> {

    @Query("SELECT r.hotel.name, COUNT(r.id) AS available_rooms FROM Room r WHERE r.available = true GROUP BY r.hotel.id")
    List<Room> findAvailableHotelRooms();

}
