package com.example.inpost.ui;

import com.example.inpost.models.Inbox;
import com.example.inpost.models.Package;
import com.example.inpost.service.InboxService;
import com.example.inpost.service.PackageService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;

public class CollectionForm extends VerticalLayout {

    Binder<Inbox> binder = new Binder<>(Inbox.class);

    private final TextField pin = new TextField("Enter collection pin:");

    Button submitButton = new Button("Submit");
    Button backButton = new Button("Back");

    private final InboxService inboxService;
    private final PackageService packageService;

    public CollectionForm(InboxService inboxService, PackageService packageService) {
        this.inboxService = inboxService;
        this.packageService = packageService;

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
        String userEnteredPin = pin.getValue();
        if (!checkPin(userEnteredPin)) {
            pin.setInvalid(true);
            pin.setLabel("Incorrect pin entered!");
        }
        Inbox releasedInbox = inboxService.releasePackage(userEnteredPin);
        if (releasedInbox != null) {
            Package releasedPackage = releasedInbox.getParcel();
            packageService.removePackage(releasedPackage);
        }
    }

    private Boolean checkPin(String pin) {
        return inboxService.checkInboxPin(pin);
    }

    private void navigateToShipping() {
        UI.getCurrent().navigate(ShippingView.class);
    }

}
