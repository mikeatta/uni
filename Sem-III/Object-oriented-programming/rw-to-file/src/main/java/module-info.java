module com.example.rwtofile {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.rwtofile to javafx.fxml;
    exports com.example.rwtofile;
}