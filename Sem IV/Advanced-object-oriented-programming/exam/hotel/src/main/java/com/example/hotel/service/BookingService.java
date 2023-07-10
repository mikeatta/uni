package com.example.hotel.service;

import com.example.hotel.model.Reservation;
import com.example.hotel.model.Room;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    private final ReservationServiceImpl reservationService;
    private final RoomServiceImpl roomService;

    public BookingService(ReservationServiceImpl reservationService, RoomServiceImpl roomService) {
        this.reservationService = reservationService;
        this.roomService = roomService;
    }

    public void bookReservation(Reservation reservation) {
        // Create the reservation
        reservationService.saveReservation(reservation);

        // Get number of people staying and available rooms
        Integer numberOfPeople = reservation.getPeople();
        List<Room> availableRooms = roomService.getAvailableRooms();

        // Handle the booking logic based on the number of people
        List<Room> bookedRooms = bookRoomsForNumberOfPeople(availableRooms, numberOfPeople);
        for (Room room : bookedRooms) {
            room.setAvailable(false);
            Long roomId = room.getId();
            roomService.markRoomAsBooked(roomId);
        }
    }

    private List<Room> bookRoomsForNumberOfPeople(List<Room> availableRooms, int numberOfPeople) {
        List<Room> bookedRooms = new ArrayList<>();
        int bookedSpaces = 0;

        for (Room room : availableRooms) {
            bookedRooms.add(room);
            bookedSpaces += room.getCapacity();
            if (bookedSpaces >= numberOfPeople) break;
        }

        return bookedRooms;
    }
}
