package com.example.hotel.ui;

import com.example.hotel.service.HotelServiceImpl;
import com.example.hotel.service.RoomServiceImpl;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Route("")
public class HomeView extends VerticalLayout {

    @Autowired
    private HotelServiceImpl hotelService;

    @Autowired
    private RoomServiceImpl roomService;

    private final VerticalLayout verticalLayout = new VerticalLayout();

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        Map<String, Integer> totalRoomsByHotel = hotelService.getTotalRoomsByHotel();
        Map<String, Integer> availableRoomsByHotel = roomService.getAvailableRoomsByHotel();

        if (totalRoomsByHotel.isEmpty()) {
            VerticalLayout errorContainer = new VerticalLayout();
            H3 noHotelsFoundHeader = new H3("No hotel information");
            Text noHotelsFoundMessage = new Text("No hotel objects were found in the database.");
            errorContainer.add(noHotelsFoundHeader, noHotelsFoundMessage);
            add(errorContainer);
        } else {
            List<Map.Entry<String, Integer>> sortedHotels = new ArrayList<>(totalRoomsByHotel.entrySet());

            sortedHotels.sort(Map.Entry.comparingByKey(Collections.reverseOrder()));

            for (Map.Entry<String, Integer> hotel : sortedHotels) {
                String hotelId = hotel.getKey();
                Integer totalRooms = hotel.getValue();
                Integer availableRooms = availableRoomsByHotel.getOrDefault(hotelId, 0);

                TextField textField = new TextField("Location name: " + hotelId);
                textField.setValue("Available rooms: " + availableRooms + "/" + totalRooms);
                textField.setReadOnly(true);
                verticalLayout.addComponentAtIndex(0, textField);
            }
        }
    }

    public HomeView() {
        Button reservationButton = new Button("Make reservation");
        reservationButton.addClickListener(e -> UI.getCurrent().navigate(ReservationView.class));
        verticalLayout.add(reservationButton);

        add(verticalLayout);
    }

}
