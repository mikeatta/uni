package com.example.hotel.controller;

import com.example.hotel.service.HotelServiceImpl;

public class HotelController {

    private final HotelServiceImpl hotelService;

    public HotelController(HotelServiceImpl hotelService) {
        this.hotelService = hotelService;
    }

}
