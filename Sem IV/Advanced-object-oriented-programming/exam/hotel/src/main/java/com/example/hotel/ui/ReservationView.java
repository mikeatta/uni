package com.example.hotel.ui;

import com.example.hotel.service.ReservationServiceImpl;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

@PageTitle("Make a reservation | Hotel Website")
@Route("/reserve")
public class ReservationView extends VerticalLayout {

    private final ReservationServiceImpl reservationService;

    @Autowired
    public ReservationView(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
        configureHeader();
        configureForm();

        add(
            configureHeader(),
            configureForm()
        );
    }

    private Component configureHeader() {
        VerticalLayout header = new VerticalLayout();
        H3 title = new H3("Make a reservation");
        Text subtitle = new Text("Fill out the form below to make a reservation.");
        header.add(title, subtitle);

        return header;
    }

    private Component configureForm() {
        ReservationForm reservationForm = new ReservationForm(reservationService);
        reservationForm.setWidth("25em");

        return reservationForm;
    }

}
