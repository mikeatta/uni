package com.example.quizzapp;

import javafx.util.Pair;

public class Product {

    private Pair<String, String> stringPair;

    public Product(Pair<String, String> stringPair) {
        this.stringPair = stringPair;
    }

    public Pair<String, String> getProduct() {
        return this.stringPair;
    }
}
