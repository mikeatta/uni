package com.example.inpost.ui;

import com.example.inpost.model.Package;
import com.example.inpost.service.PackageService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.data.binder.Binder;

import java.util.ArrayList;
import java.util.List;

public class ShippingForm extends VerticalLayout {

    Binder<Package> binder = new Binder<>(Package.class);

    private final ComboBox<String> size = new ComboBox<>("Package size:");
    private final EmailField email = new EmailField("Recipient email:");
    private final ComboBox<String> type = new ComboBox<>("Select size:");

    Button submitButton = new Button("Send package");
    Button collectButton = new Button("Collect a package");

    private final PackageService packageService;

    public ShippingForm(PackageService packageService) {
        this.packageService = packageService;

        // Bind fields by name
        binder.bindInstanceFields(this);

        add(
            configureSize(),
            email,
            configureType(),
            configureButtons()
        );
    }

    private Component configureSize() {
        List<String> packageSizes = new ArrayList<>();
        packageSizes.add("Small");
        packageSizes.add("Medium");
        packageSizes.add("Large");

        size.setItems(packageSizes);
        return size;
    }

    private Component configureType() {
        // Populate the ComboBox
        List<String> packageTypes = new ArrayList<>();
        packageTypes.add("Short-term");
        packageTypes.add("Long-term");

        type.setItems(packageTypes);
        return type;
    }

    private Component configureButtons() {
        submitButton.addClickListener(event -> submitFormInfo());
        collectButton.addClickListener(event -> navigateToCollection());

        submitButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        collectButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        return new HorizontalLayout(submitButton, collectButton);
    }

    private void navigateToCollection() {
        UI.getCurrent().navigate(CollectionView.class);
    }

    private void submitFormInfo() {
        if (binder.isValid()) {
            Package parcel = new Package();
            binder.writeBeanIfValid(parcel);
            packageService.sendPackage(parcel);
        }
    }

}
