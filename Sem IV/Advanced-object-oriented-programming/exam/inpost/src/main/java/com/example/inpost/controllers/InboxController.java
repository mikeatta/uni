package com.example.inpost.controllers;

import com.example.inpost.model.Inbox;
import com.example.inpost.service.InboxService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InboxController {

    private final InboxService inboxService;

    public InboxController(InboxService inboxService) {
        this.inboxService = inboxService;
    }

    @GetMapping("/inboxes")
    public List<Inbox> getInboxes() {
        return inboxService.getAllInboxes();
    }

}
