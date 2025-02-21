package com.example.quizapp;

import javafx.util.Pair;

public class Product {

    private final Pair<String, String> stringPair;

    public Product(Pair<String, String> stringPair) {
        this.stringPair = stringPair;
    }

    public Pair<String, String> getProduct() {
        return this.stringPair;
    }
}
