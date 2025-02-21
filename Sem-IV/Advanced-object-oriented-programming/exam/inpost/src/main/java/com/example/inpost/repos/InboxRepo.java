package com.example.inpost.repos;

import com.example.inpost.models.Inbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InboxRepo extends JpaRepository<Inbox, Long> {

    @Query("SELECT i FROM Inbox i WHERE i.available = true")
    List<Inbox> getAvailableInboxes();

    @Query("SELECT i.pin FROM Inbox i WHERE i.pin = :inboxPin")
    String getInboxPin(@Param("inboxPin") String inboxPin);

    @Query("SELECT i FROM Inbox i WHERE i.pin = :inboxPin")
    Inbox getInboxByPin(@Param("inboxPin") String inboxPin);

    @Transactional
    @Modifying
    @Query("UPDATE Inbox i SET i.available = true WHERE i.pin = :inboxPin")
    void markInboxAsAvailable(@Param("inboxPin") String inboxPin);

    @Query("SELECT i FROM Inbox i WHERE i.available = TRUE AND i.size <= :parcelSize ORDER BY i.size DESC")
    List<Inbox> getSmallestInboxAvailable(@Param("parcelSize") String parcelSize);

}
