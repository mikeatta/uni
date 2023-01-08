package com.example.javaexceptions;

public class ExceptionHandler extends Exception {

    String storeMessage;

    public ExceptionHandler(String message) {
        storeMessage = message;
    }
}

// Card number TextField exceptions
class CardNumberEmpty extends ExceptionHandler {
    public CardNumberEmpty(String message) {
        super(message);
    }
}
class IncorrectCardLength extends ExceptionHandler {
    public IncorrectCardLength(String message) {
        super(message);
    }
}
class InvalidCardFieldFormat extends ExceptionHandler {
    public InvalidCardFieldFormat(String message) {
        super(message);
    }
}

// Expiry date TextField exceptions
class ExpiryDateEmpty extends ExceptionHandler {
    public ExpiryDateEmpty(String message) {
        super(message);
    }
}
class IncorrectDateLength extends ExceptionHandler {
    public IncorrectDateLength(String message) {
        super(message);
    }
}
class InvalidDateFieldFormat extends ExceptionHandler {
    public InvalidDateFieldFormat(String message) {
        super(message);
    }
}
class InvalidDateFieldMonth extends ExceptionHandler {
    public InvalidDateFieldMonth(String message) {
        super(message);
    }
}
class InvalidDateFieldYear extends ExceptionHandler {
    public InvalidDateFieldYear(String message) {
        super(message);
    }
}
class ExpiryDateDue extends ExceptionHandler {
    public ExpiryDateDue(String message) {
        super(message);
    }
}

// Cvv code TextField exceptions
class CvvEmpty extends ExceptionHandler {
    public CvvEmpty(String message) {
        super(message);
    }
}
class IncorrectCvvLength extends ExceptionHandler {
    public IncorrectCvvLength(String message) {
        super(message);
    }
}
class InvalidCvvFieldFormat extends ExceptionHandler {
    public InvalidCvvFieldFormat(String message) {
        super(message);
    }
}