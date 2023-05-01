package com.example.reflections;

public class Song {
    private String title;
    private Integer tempo;
    private String rhythm;
    private String album;
    private String performer;
    private String lyrics;

    Song(String title, Integer tempo, String rhythm,
         String album, String performer, String lyrics) {
        this.title = title;
        this.tempo = tempo;
        this.rhythm = rhythm;
        this.album = album;
        this.performer = performer;
        this.lyrics = lyrics;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTempo(Integer tempo) {
        this.tempo = tempo;
    }

    public Integer getTempo() {
        return this.tempo;
    }

    public void setRhythm(String rhythm) {
        this.rhythm = rhythm;
    }

    public String getRhythm() {
        return this.rhythm;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getAlbum() {
        return this.album;
    }

    public void setPerformer(String performer) {
        this.performer = performer;
    }

    public String getPerformer() {
        return this.performer;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public String getLyrics() {
        return this.lyrics;
    }
}
