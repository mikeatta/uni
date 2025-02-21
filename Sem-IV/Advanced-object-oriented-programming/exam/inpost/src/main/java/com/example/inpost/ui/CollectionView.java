package com.example.inpost.ui;

import com.example.inpost.models.Inbox;
import com.example.inpost.service.InboxService;
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

@PageTitle("Collect a package | Inpost")
@Route("/collect")
public class CollectionView extends VerticalLayout {

    Grid<Inbox> grid = new Grid<>(Inbox.class);

    private final InboxService inboxService;
    private final PackageService packageService;

    Button toggleGridButton = new Button("Show grid", this::toggleGrid);

    public CollectionView(InboxService inboxService, PackageService packageService) {
        this.inboxService = inboxService;
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
        grid.setItems(inboxService.getAllInboxes());
        grid.setVisible(false);
        return grid;
    }

    private Component configureForm() {
        CollectionForm form = new CollectionForm(inboxService, packageService);
        form.setWidth("25em");
        return form;
    }

    private Component configureHeader() {
        VerticalLayout heading = new VerticalLayout();
        H3 header = new H3("Collect a package");
        Text subtitle = new Text("Provide a pin to collect the package.");

        heading.add(header, subtitle);
        return heading;
    }

}
