package com.example.hotel.repo;

import com.example.hotel.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HotelRepo extends JpaRepository<Hotel, Long> {

    @Query("SELECT SUM(h.totalRooms) FROM Hotel h")
    Integer getTotalRoomCount();
}
