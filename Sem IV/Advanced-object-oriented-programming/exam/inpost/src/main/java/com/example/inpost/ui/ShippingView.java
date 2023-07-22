package com.example.inpost.ui;

import com.example.inpost.service.PackageService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Ship a package | Inpost")
@Route("")
public class ShippingView extends VerticalLayout {

    private final PackageService packageService;

    public ShippingView(PackageService packageService) {
        this.packageService = packageService;

        setSizeFull();
        configureHeader();
        configureForm();

        add(
            configureHeader(),
            configureForm()
        );
    }

    private Component configureForm() {
        ShippingForm form = new ShippingForm(packageService);
        form.setWidth("25em");
        return form;
    }

    private Component configureHeader() {
        VerticalLayout heading = new VerticalLayout();
        H3 header = new H3("Send a package");
        Text subtitle = new Text("Fill out the form to send a parcel.");

        heading.add(header, subtitle);
        return heading;
    }

}
