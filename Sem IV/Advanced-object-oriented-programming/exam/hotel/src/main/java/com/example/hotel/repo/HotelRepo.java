package com.example.hotel.repo;

import com.example.hotel.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HotelRepo extends JpaRepository<Hotel, Long> {

    @Query("SELECT h FROM Hotel h")
    List<Hotel> findAllHotels();

}
