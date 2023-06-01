package com.example.webapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "importance")
    @Enumerated(EnumType.STRING)
    private ImportanceEnum.Importance importance;

    @Column(name = "timestamp")
    private Timestamp timestamp;

    @Column(name = "text", nullable = false)
    @NotBlank(message = "Cannot submit empty note!")
    private String text;

    public Note() {
    }

    public Note(ImportanceEnum.Importance importance, Timestamp timestamp, String text) {
        this.importance = importance;
        this.timestamp = timestamp;
        this.text = text;
    }

    @PrePersist
    protected void onCreate() {
        timestamp = Timestamp.from(Instant.now());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ImportanceEnum.Importance getImportance() {
        return importance;
    }

    public void setImportance(ImportanceEnum.Importance importance) {
        this.importance = importance;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
