package com.example.webapp.service;

import com.example.webapp.entity.Note;

import java.util.List;

public interface NoteService {

    List<Note> getAllNotes();

    Note addNote(Note note);
}
