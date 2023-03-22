module com.example.tcpipserver {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.tcpipserver to javafx.fxml;
    exports com.example.tcpipserver;
}