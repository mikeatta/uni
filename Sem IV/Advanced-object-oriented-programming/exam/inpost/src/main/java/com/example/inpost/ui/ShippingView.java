package com.example.inpost.ui;

import com.example.inpost.models.Package;
import com.example.inpost.service.PackageService;
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Ship a package | Inpost")
@Route("")
public class ShippingView extends VerticalLayout {

    Grid<Package> grid = new Grid<>(Package.class);

    private final PackageService packageService;

    Button toggleGridButton = new Button("Show grid", this::toggleGrid);

    public ShippingView(PackageService packageService) {
        this.packageService = packageService;

        setSizeFull();
        configureHeader();
        configureForm();
        configureButton();
        configureGrid();

        add(
            configureHeader(),
            configureForm(),
            configureButton(),
            configureGrid()
        );
    }

    private Component configureButton() {
        toggleGridButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        return new VerticalLayout(toggleGridButton);
    }

    private void toggleGrid(ClickEvent<Button> event) {
        boolean gridVisible = grid.isVisible();
        toggleGridButton.setText(gridVisible ? "Show grid" : "Hide grid");
        grid.setVisible(!gridVisible);
    }

    private Component configureGrid() {
        grid.setSizeFull();
        grid.getColumns().forEach(col -> col.setAutoWidth(true));
        grid.setItems(packageService.getAllPackages());
        grid.setVisible(false);
        return grid;
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
