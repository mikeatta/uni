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

    public List<Inbox> getAvailableInboxes() {
        return inboxRepo.getAvailableInboxes();
    }

    public Boolean checkInboxPin(String userEnteredPin) {
        String inboxPin = inboxRepo.getInboxPin(userEnteredPin);
        if (inboxPin == null) {
            inboxPin = "";
        }
        return inboxPin.equals(userEnteredPin);
    }

    public Inbox releaseInbox(String inboxPin) {
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

    public void generateInboxes(Integer amount) {
        List<Inbox> newInboxes = new ArrayList<>(amount);
        int generated = 0;
        while (generated != amount) {
            Inbox inbox = new Inbox();
            inbox.setSize(getRandomSize());
            inbox.setAvailable(true);
            inbox.setPin(getRandomPin());
            newInboxes.add(inbox);
            generated += 1;
        }

        inboxRepo.saveAll(newInboxes);
    }

    private Integer getRandomNumber(Integer limit) {
        Random rand = new Random();
        return rand.nextInt(limit);
    }

    private String getRandomSize() {
        String[] sizes = { "small", "medium", "large" };
        return sizes[getRandomNumber(sizes.length)];
    }

    private String getRandomPin() {
        StringBuilder pin = new StringBuilder();
        while (pin.length() != 4) {
            pin.append(getRandomNumber(10));
        }
        return pin.toString();
    }

}
