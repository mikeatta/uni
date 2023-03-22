module com.example.tcpipclient {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.tcpipclient to javafx.fxml;
    exports com.example.tcpipclient;
}