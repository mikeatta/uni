package com.example.hotel.ui;

import com.example.hotel.converter.ReservationConverters;
import com.example.hotel.model.Reservation;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.shared.Registration;

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

    public ReservationForm() {
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

    public void setReservation(Reservation reservation) {
        binder.setBean(reservation);
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

        send.addClickListener(event -> validateAndSave());
        cancel.addClickListener(event -> fireEvent(new CloseEvent(this)));

        send.addClickShortcut(Key.ENTER);
        cancel.addClickShortcut(Key.ESCAPE);

        return new HorizontalLayout(send, clear, cancel);
    }

    private void validateAndSave() {
        if (binder.isValid()) {
            fireEvent(new SaveEvent(this, binder.getBean()));
        }
    }

    public static abstract class ReservationFormEvent extends ComponentEvent<ReservationForm> {

        private final Reservation reservation;

        private ReservationFormEvent(ReservationForm source, Reservation reservation) {
            super(source, false);
            this.reservation = reservation;
        }

        public Reservation getReservation() {
            return reservation;
        }
    }

    public static class SaveEvent extends ReservationFormEvent {
        SaveEvent(ReservationForm source, Reservation reservation) {
            super(source, reservation);
        }
    }

    public static class DeleteEvent extends ReservationFormEvent {
        DeleteEvent(ReservationForm source, Reservation reservation) {
            super(source, reservation);
        }
    }

    public static class CloseEvent extends ReservationFormEvent {
        CloseEvent(ReservationForm source) {
            super(source, null);
        }
    }

    public Registration addDeleteListener(ComponentEventListener<DeleteEvent> listener) {
        return addListener(DeleteEvent.class, listener);
    }

    public Registration addSaveListener(ComponentEventListener<SaveEvent> listener) {
        return addListener(SaveEvent.class, listener);
    }

    public Registration addCloseListener(ComponentEventListener<CloseEvent> listener) {
        return addListener(CloseEvent.class, listener);
    }
}
