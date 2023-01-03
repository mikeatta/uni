package com.example.javaexceptions;

public class ExceptionHandler extends Exception {

    String storeMessage;

    public ExceptionHandler(String message) {
        storeMessage = message;
    }
}

// Empty TextField exceptions
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

// Incorrect TextField length exceptions
class IncorrectCardLength extends ExceptionHandler {
    public IncorrectCardLength(String message) {
        super(message);
    }
}

class IncorrectDateLength extends ExceptionHandler {
    public IncorrectDateLength(String message) {
        super(message);
    }
}

class IncorrectCvvLength extends ExceptionHandler {
    public IncorrectCvvLength(String message) {
        super(message);
    }
}