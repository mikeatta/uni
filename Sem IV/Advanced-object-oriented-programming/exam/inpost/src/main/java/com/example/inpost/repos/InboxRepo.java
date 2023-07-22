package com.example.inpost.repos;

import com.example.inpost.models.Inbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InboxRepo extends JpaRepository<Inbox, Long> {

    @Query("SELECT Inbox FROM Inbox WHERE available = true")
    List<Inbox> getAvailableInboxes();

    @Query("SELECT pin FROM Inbox WHERE pin = :inboxPin")
    Long getInboxPin(@Param("inboxPin") Long inboxPin);

    @Query("SELECT Inbox FROM Inbox WHERE pin = :inboxPin")
    Inbox getInboxByPin(@Param("inboxPin") Long inboxPin);

    @Modifying
    @Query("UPDATE Inbox SET available = true WHERE pin = :inboxPin")
    void markInboxAsAvailable(@Param("inboxPin") Long inboxPin);

    @Query("SELECT i FROM Inbox i WHERE i.available = TRUE AND i.size <= :parcelSize ORDER BY i.size DESC")
    List<Inbox> getSmallestInboxAvailable(@Param("parcelSize") String parcelSize);

}
