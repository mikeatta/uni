module com.example.patientlist {
    requires javafx.controls;
    requires javafx.fxml;
    requires com.google.gson;


    opens com.example.patientlist to javafx.fxml;
    exports com.example.patientlist;
}