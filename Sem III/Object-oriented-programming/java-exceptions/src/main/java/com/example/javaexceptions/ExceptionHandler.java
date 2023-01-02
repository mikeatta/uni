package com.example.javaexceptions;

public class ExceptionHandler extends Exception {

    public ExceptionHandler(String message) {
        System.out.println(message);
    }
}

class CardNumberEmpty extends ExceptionHandler {
    public CardNumberEmpty(String message) {
        super(message);
    }
}

class ExpiryDateEmpty extends ExceptionHandler {
    public ExpiryDateEmpty(String message) {
        super(message);
    }
}

class CvvEmpty extends ExceptionHandler {
    public CvvEmpty(String message) {
        super(message);
    }
}