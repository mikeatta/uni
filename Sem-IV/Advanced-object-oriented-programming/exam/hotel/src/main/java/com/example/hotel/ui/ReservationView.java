package com.example.hotel.ui;

import com.example.hotel.service.BookingService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Make a reservation | Hotel Website")
@Route("/reserve")
public class ReservationView extends VerticalLayout {

    private final BookingService bookingService;

    public ReservationView(BookingService bookingService) {
        this.bookingService = bookingService;
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
        ReservationForm reservationForm = new ReservationForm(bookingService);
        reservationForm.setWidth("25em");

        return reservationForm;
    }

}
