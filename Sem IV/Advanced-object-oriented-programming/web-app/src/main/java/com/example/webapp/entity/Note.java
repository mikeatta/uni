package com.example.webapp.entity;

import jakarta.persistence.*;

import java.sql.Time;

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
    private Time timestamp;

    @Column(name = "text", nullable = false)
    private String text;

    public Note() {
    }

    public Note(ImportanceEnum.Importance importance, Time timestamp, String text) {
        this.importance = importance;
        this.timestamp = timestamp;
        this.text = text;
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

    public Time getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Time timestamp) {
        this.timestamp = timestamp;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
