module com.example.validationannotations {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.validationannotations to javafx.fxml;
    exports com.example.validationannotations;
}