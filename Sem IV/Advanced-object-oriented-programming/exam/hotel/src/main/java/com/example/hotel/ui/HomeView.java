package com.example.hotel.ui;

import com.example.hotel.service.HotelServiceImpl;
import com.example.hotel.service.RoomServiceImpl;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Route("")
public class HomeView extends VerticalLayout {

    @Autowired
    private HotelServiceImpl hotelService;

    @Autowired
    private RoomServiceImpl roomService;

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        Map<String, Integer> totalRoomsByHotel = hotelService.getTotalRoomsByHotel();
        Map<String, Integer> availableRoomsByHotel = roomService.getAvailableRoomsByHotel();
        VerticalLayout verticalLayout = new VerticalLayout();

        if (totalRoomsByHotel.isEmpty()) {
            VerticalLayout errorContainer = new VerticalLayout();
            H3 noHotelsFoundHeader = new H3("No hotel information");
            Text noHotelsFoundMessage = new Text("No hotel objects were found in the database.");
            errorContainer.add(noHotelsFoundHeader, noHotelsFoundMessage);
            add(errorContainer);
        } else {
            for (Map.Entry<String, Integer> hotel : totalRoomsByHotel.entrySet()) {
                String hotelId = hotel.getKey();
                Integer totalRooms = hotel.getValue();
                Integer availableRooms = availableRoomsByHotel.getOrDefault(hotelId, 0);

                TextField textField = new TextField("Location name: " + hotelId);
                textField.setValue("Available rooms: " + availableRooms + "/" + totalRooms);
                textField.setReadOnly(true);
                verticalLayout.add(textField);
            }

            add(verticalLayout);
        }
    }

    public HomeView() {
    }

}
