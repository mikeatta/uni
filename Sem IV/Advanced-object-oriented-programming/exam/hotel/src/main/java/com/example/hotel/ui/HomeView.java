package com.example.hotel.ui;

import com.example.hotel.service.HotelServiceImpl;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

@Route("")
public class HomeView extends VerticalLayout {

    private final TextField totalRoomsLabel;

    @Autowired
    private HotelServiceImpl hotelService;

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        Integer totalRooms = hotelService.getTotalRooms();
        totalRoomsLabel.setValue("Total rooms: " + totalRooms);
        totalRoomsLabel.setReadOnly(true);
    }

    public HomeView() {
        totalRoomsLabel = new TextField();
        add(totalRoomsLabel);
    }

}
