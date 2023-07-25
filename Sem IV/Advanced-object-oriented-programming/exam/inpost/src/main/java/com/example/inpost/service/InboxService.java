package com.example.inpost.service;

import com.example.inpost.models.Inbox;
import com.example.inpost.repos.InboxRepo;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InboxService {

    private final InboxRepo inboxRepo;

    public InboxService(InboxRepo inboxRepo) {
        this.inboxRepo = inboxRepo;
    }

    public List<Inbox> getAllInboxes() {
        return inboxRepo.findAll();
    }

    public Boolean checkInboxPin(String userEnteredPin) {
        String inboxPin = inboxRepo.getInboxPin(userEnteredPin);
        if (inboxPin == null) {
            inboxPin = "";
        }
        return inboxPin.equals(userEnteredPin);
    }

    public Inbox releasePackage(String inboxPin) {
        Inbox inbox = inboxRepo.getInboxByPin(inboxPin);
        if (inbox != null && !inbox.getAvailable()) {
            inboxRepo.markInboxAsAvailable(inboxPin);
            return inbox;
        }
        return null;
    }

    public Inbox getSmallestInbox(String parcelSize) {
        List<Inbox> availableInboxes = inboxRepo.getSmallestInboxAvailable(parcelSize);
        if (!availableInboxes.isEmpty()) {
            Inbox inbox = availableInboxes.get(0);
            inbox.setAvailable(false);
            inboxRepo.save(inbox);
            return inbox;
        }
        return null;
    }

}
