module com.example.javaexceptions {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.javaexceptions to javafx.fxml;
    exports com.example.javaexceptions;
}