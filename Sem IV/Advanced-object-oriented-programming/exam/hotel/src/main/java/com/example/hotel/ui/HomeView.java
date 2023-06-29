package com.example.hotel.ui;

import com.example.hotel.service.HotelServiceImpl;
import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Route("")
public class HomeView extends VerticalLayout {

    @Autowired
    private HotelServiceImpl hotelService;

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        Map<String, Integer> totalRoomsByHotel = hotelService.getTotalRoomsByHotel();

        if (totalRoomsByHotel.isEmpty()) {
            VerticalLayout errorContainer = new VerticalLayout();
            H3 noHotelsFoundHeader = new H3("No hotel information");
            Text noHotelsFoundMessage = new Text("No hotel objects were found in the database.");
            errorContainer.add(noHotelsFoundHeader, noHotelsFoundMessage);
            add(errorContainer);
        } else {
            for (Map.Entry<String, Integer> hotel : totalRoomsByHotel.entrySet()) {
                String locationName = hotel.getKey();
                Integer totalRooms = hotel.getValue();
                TextField textField = new TextField("Hotel name: " + locationName);
                textField.setValue("Total rooms: " + totalRooms);
                textField.setReadOnly(true);
                add(textField);
            }
        }
    }

    public HomeView() {
    }

}
