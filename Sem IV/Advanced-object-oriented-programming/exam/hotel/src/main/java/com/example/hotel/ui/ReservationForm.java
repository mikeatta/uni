package com.example.hotel.ui;

import com.example.hotel.converter.ReservationConverters;
import com.example.hotel.model.Reservation;
import com.example.hotel.service.ReservationServiceImpl;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;

import java.util.stream.IntStream;

public class ReservationForm  extends FormLayout {

    Binder<Reservation> binder = new Binder<>(Reservation.class);

    TextField firstName = new TextField("First name:");
    TextField lastName = new TextField("Last name:");
    EmailField email = new EmailField("Email address:");
    DatePicker checkInDate = new DatePicker("Check in date:");
    DatePicker checkOutDate = new DatePicker("Check out date:");
    ComboBox<Integer> people = new ComboBox<>("People staying:");

    Button send = new Button("Send");
    Button clear = new Button("Clear");
    Button cancel = new Button("Cancel");

    private final ReservationServiceImpl reservationService;

    public ReservationForm(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
        addClassName("reservation-form");

        binder.forField(checkInDate)
            .withConverter(new ReservationConverters.LocalDateToDateConverter())
            .bind(Reservation::getCheckInDate, Reservation::setCheckInDate);

        binder.forField(checkOutDate)
            .withConverter(new ReservationConverters.LocalDateToDateConverter())
            .bind(Reservation::getCheckOutDate, Reservation::setCheckOutDate);

        binder.forField(people)
            .withConverter(new ReservationConverters.IntegerToIntConverter())
            .bind(Reservation::getPeople, Reservation::setPeople);

        // Automatically bind fields with matching names
        binder.bindInstanceFields(this);

        add(
            firstName,
            lastName,
            email,
            checkInDate,
            checkOutDate,
            configurePeopleDropdown(),
            createButtonLayout()
        );
    }

    private Component configurePeopleDropdown() {
        // Populate the ComboBox
        people.setItems(IntStream.rangeClosed(1, 10).boxed().toList());

        // Allow entering value from keyboard
        people.setAllowCustomValue(true);

        // TODO: Validate keyboard input

        return people;
    }

    private Component createButtonLayout() {
        send.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        clear.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        cancel.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        send.addClickListener(e -> submitForm());
        cancel.addClickListener(e -> UI.getCurrent().navigate(HomeView.class));

        send.addClickShortcut(Key.ENTER);
        cancel.addClickShortcut(Key.ESCAPE);

        return new HorizontalLayout(send, clear, cancel);
    }

    private void submitForm() {
        if (binder.isValid()) {
            Reservation reservation = new Reservation();
            binder.writeBeanIfValid(reservation);
            reservationService.saveReservation(reservation);
            UI.getCurrent().navigate(HomeView.class);
        }
    }
}
