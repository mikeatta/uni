package com.example.hotel.ui;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;

import java.util.stream.IntStream;

public class ReservationForm  extends FormLayout {

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

        send.addClickShortcut(Key.ENTER);
        cancel.addClickShortcut(Key.ESCAPE);

        return new HorizontalLayout(send, clear, cancel);
    }
}
