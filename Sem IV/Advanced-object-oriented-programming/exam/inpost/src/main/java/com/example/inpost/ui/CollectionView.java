package com.example.inpost.ui;

import com.example.inpost.service.InboxService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Collect a package | Inpost")
@Route("/collect")
public class CollectionView extends VerticalLayout {

    private final InboxService inboxService;

    public CollectionView(InboxService inboxService) {
        this.inboxService = inboxService;
        setSizeFull();
        configureHeader();
        configureForm();

        add(
            configureHeader(),
            configureForm()
        );
    }

    private Component configureForm() {
        CollectionForm form = new CollectionForm(inboxService);
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
