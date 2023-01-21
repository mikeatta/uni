module com.example.imageviewer {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.imageviewer to javafx.fxml;
    exports com.example.imageviewer;
}