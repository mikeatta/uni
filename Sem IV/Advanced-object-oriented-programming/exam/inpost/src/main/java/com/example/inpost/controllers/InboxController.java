package com.example.inpost.controllers;

import com.example.inpost.models.Inbox;
import com.example.inpost.service.InboxService;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/available")
    public List<Inbox> getAvailableInboxes() {
        return inboxService.getAvailableInboxes();
    }

    @PostMapping("/generate/{amount}")
    public void generateInboxes(@PathVariable("amount") Integer amount) {
        inboxService.generateInboxes(amount);
    }

}
