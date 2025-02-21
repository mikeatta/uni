package com.example.webapp.service;

import com.example.webapp.entity.Note;
import com.example.webapp.repository.NoteRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {

    private NoteRepo noteRepo;

    public NoteServiceImpl(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    @Override
    public List<Note> getAllNotes() {
        return noteRepo.findAll();
    }

    @Override
    public Note addNote(Note note) {
        return noteRepo.save(note);
    }

}
