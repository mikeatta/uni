module com.example.patientlist {
    requires javafx.controls;
    requires javafx.fxml;
    requires json.simple;


    opens com.example.patientlist to javafx.fxml;
    exports com.example.patientlist;
}