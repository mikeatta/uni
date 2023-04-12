module com.example.reflections {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.reflections to javafx.fxml;
    exports com.example.reflections;
}