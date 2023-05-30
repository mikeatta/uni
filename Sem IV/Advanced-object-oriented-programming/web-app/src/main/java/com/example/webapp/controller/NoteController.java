package com.example.webapp.controller;

import com.example.webapp.entity.Note;
import com.example.webapp.service.NoteService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class NoteController {

    private NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public String listNotes(Model model) {
        model.addAttribute("notes", noteService.getAllNotes());
        return "notes";
    }

    @PostMapping("/notes")
    public String addNote(@ModelAttribute("note") Note note) {
        noteService.addNote(note);
        return "redirect:/notes";
    }

}
