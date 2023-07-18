package com.example.inpost.service;

import com.example.inpost.model.Inbox;
import com.example.inpost.repo.InboxRepo;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class InboxService {

    private final InboxRepo inboxRepo;

    public InboxService(InboxRepo inboxRepo) {
        this.inboxRepo = inboxRepo;
    }

    public List<Inbox> getAllInboxes() {
        return inboxRepo.findAll();
    }

    public Boolean checkInboxPin(Long userPin) {
        Long packagePin = Long.valueOf(inboxRepo.getPackagePin(userPin));
        if (packagePin == null) {
            return false;
        }
        return packagePin.equals(userPin);
    }

    public void releasePackage() {
        // Update repo: set availability to true
    }

    public Inbox getSmallestInbox(String parcelType) {
        return (Inbox) inboxRepo.getAvailableInboxes().stream()
                .sorted(Comparator.comparing(Inbox::getSize))
                .sorted(Comparator.comparing(inbox -> parcelType))
                .toList();
    }

}
