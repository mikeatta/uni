package com.example.inpost.ui;

import com.example.inpost.model.Inbox;
import com.example.inpost.service.InboxService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.data.binder.Binder;

public class CollectionForm extends VerticalLayout {

    Binder<Inbox> binder = new Binder<>(Inbox.class);

    NumberField pin = new NumberField("Enter collection pin:");

    Button submitButton = new Button("Submit");
    Button backButton = new Button("Back");

    private final InboxService inboxService;

    public CollectionForm(InboxService inboxService) {
        this.inboxService = inboxService;
        binder.bindInstanceFields(this);

        add(
            pin,
            configureButtons()
        );
    }

    private Component configureButtons() {
        submitButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        backButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        submitButton.addClickListener(event -> collectPackage());
        backButton.addClickListener(event -> navigateToShipping());

        return new HorizontalLayout(submitButton, backButton);
    }

    private void collectPackage() {
        if (checkPin()) {
            inboxService.releasePackage();
        }
    }

    private Boolean checkPin() {
        return inboxService.checkInboxPin(pin.getValue().longValue());
    }

    private void navigateToShipping() {
        UI.getCurrent().navigate(ShippingView.class);
    }

}
