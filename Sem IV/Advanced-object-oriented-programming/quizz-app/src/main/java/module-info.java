module com.example.quizzapp {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.quizzapp to javafx.fxml;
    exports com.example.quizzapp;
}