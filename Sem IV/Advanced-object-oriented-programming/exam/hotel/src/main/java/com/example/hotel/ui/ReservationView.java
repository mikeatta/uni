package com.example.hotel.ui;

import com.example.hotel.service.ReservationServiceImpl;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

@Route("/reserve")
public class ReservationView extends VerticalLayout {

    @Autowired
    private ReservationServiceImpl reservationService;

    public ReservationView() {
        VerticalLayout header = new VerticalLayout();
        H3 title = new H3("Make a reservation");
        Text subtitle = new Text("Fill out the form below to make a reservation.");
        header.add(title, subtitle);

        Button backButton = new Button("Back");
        backButton.addClickListener(e -> UI.getCurrent()
                .navigate(HomeView.class));
        add(header, backButton);
    }

}
