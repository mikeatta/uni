package com.example.hotel.repo;

import com.example.hotel.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HotelRepo extends JpaRepository<Hotel, Long> {

    @Query("SELECT DISTINCT h FROM Hotel h LEFT JOIN FETCH h.rooms")
    List<Hotel> findAllHotelsWithRooms();

}
