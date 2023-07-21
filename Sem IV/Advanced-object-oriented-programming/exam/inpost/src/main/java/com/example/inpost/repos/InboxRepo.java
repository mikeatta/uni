package com.example.inpost.repos;

import com.example.inpost.models.Inbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InboxRepo extends JpaRepository<Inbox, Long> {

    @Query("SELECT Inbox FROM Inbox WHERE available = true")
    List<Inbox> getAvailableInboxes();

    @Query("SELECT i.pin FROM Inbox i WHERE i.pin = :packagePin")
    Long getPackagePin(@Param("packagePin") Long packagePin);

}
