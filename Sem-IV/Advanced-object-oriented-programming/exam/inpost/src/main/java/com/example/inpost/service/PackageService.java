package com.example.inpost.service;

import com.example.inpost.models.Inbox;
import com.example.inpost.models.Package;
import com.example.inpost.repos.PackageRepo;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

@Service
public class PackageService {

    private final PackageRepo packageRepo;
    private final InboxService inboxService;

    public PackageService(PackageRepo packageRepo, InboxService inboxService) {
        this.packageRepo = packageRepo;
        this.inboxService = inboxService;
    }

    public List<Package> getAllPackages() {
        return packageRepo.findAll();
    }

    // TODO: Set collection date to 5 min and an hour from the creation date
    public void sendPackage(Package parcel) {
        String parcelType = parcel.getType();
        Calendar today = Calendar.getInstance();
        today.set(Calendar.HOUR_OF_DAY, 0);
        Date collectionDate;

        if (parcelType.equals("Short-term")) {
            // Set pick-up deadline for 2 days
            today.add(Calendar.DAY_OF_MONTH, 2);
        } else {
            // Set pick-up deadline for 7 days
            today.add(Calendar.DAY_OF_MONTH, 7);
        }

        collectionDate = new Date(today.getTime().getTime());
        parcel.setCollectionDeadline(collectionDate);

        // Get the smallest inbox available
        String parcelSize = parcel.getSize().toLowerCase();
        Inbox smallestInboxAvailable = inboxService.getSmallestInbox(parcelSize);
        parcel.setInbox(smallestInboxAvailable);

        packageRepo.save(parcel);
    }

    public void removePackage(Package parcel) {
        packageRepo.delete(parcel);
    }

}
