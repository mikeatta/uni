package com.example.hotel.repo;

import com.example.hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepo extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r WHERE r.available = true")
    List<Room> findAvailableHotelRooms();

    @Query("SELECT r.hotel.name, COUNT(r.id) AS available_rooms FROM Room r WHERE r.available = true GROUP BY r.hotel.id")
    List<Object[]> findAvailableRoomsByHotel();

    @Modifying
    @Query("UPDATE Room r SET r.available = false WHERE r.id = :roomId")
    void markRoomAsBooked(@Param("roomId") Long roomId);

}
