module com.example.client {
    requires javafx.controls;
    requires javafx.fxml;
    requires com.example.quizzapp;


    opens com.example.client to javafx.fxml;
    exports com.example.client;
}