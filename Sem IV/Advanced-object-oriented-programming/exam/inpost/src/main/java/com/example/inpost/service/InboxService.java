package com.example.inpost.service;

import com.example.inpost.models.Inbox;
import com.example.inpost.repos.InboxRepo;
import org.springframework.stereotype.Service;

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
        Long packagePin = inboxRepo.getPackagePin(userPin);
        if (packagePin == null) {
            return false;
        }
        return packagePin.equals(userPin);
    }

    public void releasePackage() {
        // Update repos: set availability to true
    }

    public Inbox getSmallestInbox(String parcelType) {
        return null;
    }

}
