package com.example.hotel.ui;

import com.example.hotel.model.Reservation;
import com.example.hotel.service.ReservationServiceImpl;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("List of reservations | Hotel Website")
@Route("/reservations")
public class ReservationsView extends VerticalLayout {

    private final ReservationServiceImpl reservationService;

    Grid<Reservation> grid = new Grid<>(Reservation.class);

    public ReservationsView(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
        addClassName("reservations-view");
        setSizeFull();

        if (reservationService.findAllReservations().isEmpty()) {
            VerticalLayout errorContainer = new VerticalLayout();
            H3 noReservationsFoundHeader = new H3("No reservation information");
            Text noReservationsFoundMessage = new Text("No reservations have been found in the database.");
            errorContainer.add(noReservationsFoundHeader, noReservationsFoundMessage);
            add(errorContainer);
        } else {
            configureLayout();
            add(grid);

            updateList();
        }
    }

    private void updateList() {
        grid.setItems(reservationService.findAllReservations());
    }

    private void configureLayout() {
        grid.addClassName("reservations-grid");
        grid.setSizeFull();
        grid.getColumns().forEach(col -> col.setAutoWidth(true));
    }

}
