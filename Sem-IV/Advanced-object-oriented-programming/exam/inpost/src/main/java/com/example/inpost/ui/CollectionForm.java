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
import com.vaadin.flow.data.binder.BinderValidationStatus;
import com.vaadin.flow.data.validator.RegexpValidator;

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

        binder.forField(pin)
            .withValidator(new RegexpValidator("Please enter a valid 4-digit pin.", "[0-9]{4}"))
            .bind(Inbox::getPin, Inbox::setPin);

        add(
            configurePin(),
            configureButtons()
        );
    }

    private Component configurePin() {
        pin.setAllowedCharPattern("[0-9]");
        pin.setMaxLength(4);

        return pin;
    }

    private Component configureButtons() {
        submitButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        backButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        submitButton.addClickListener(event -> collectPackage());
        backButton.addClickListener(event -> navigateToShipping());

        return new HorizontalLayout(submitButton, backButton);
    }

    private void collectPackage() {
        if (validateForm()) {
            String userEnteredPin = pin.getValue();
            if (checkUserPin(userEnteredPin)) {
                openInbox(userEnteredPin);
            } else {
                handleInvalidPin();
            }
        }
    }

    private void handleInvalidPin() {
        pin.setInvalid(true);
        pin.setErrorMessage("Invalid pin code!");
    }

    private void openInbox(String pin) {
        Inbox releasedInbox = inboxService.releaseInbox(pin);
        if (releasedInbox != null) {
            Package releasedPackage = releasedInbox.getParcel();
            packageService.removePackage(releasedPackage);
        }
    }

    private boolean validateForm() {
        BinderValidationStatus<Inbox> status = binder.validate();
        if (status.hasErrors()) {
            String regexError = status.getValidationErrors().iterator().next().getErrorMessage();
            pin.setInvalid(true);
            pin.setErrorMessage(regexError);
            return false;
        }
        return true;
    }

    private Boolean checkUserPin(String pin) {
        return inboxService.checkInboxPin(pin);
    }

    private void navigateToShipping() {
        UI.getCurrent().navigate(ShippingView.class);
    }

}
