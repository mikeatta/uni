package com.example.webapp.controller;

import com.example.webapp.entity.Note;
import com.example.webapp.service.NoteService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

@Controller
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public String listNotes(Model model) {
        // Retrieve notes from the database
        model.addAttribute("notes", noteService.getAllNotes());
        // Create new note object to store submitted form content
        model.addAttribute("note", new Note());
        return "notes";
    }

    @PostMapping("/notes")
    public String createNote(@ModelAttribute("note") @Valid Note note, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("notes", noteService.getAllNotes());
            return "notes";
        }

        noteService.addNote(note);
        return "redirect:/notes";
    }

}
