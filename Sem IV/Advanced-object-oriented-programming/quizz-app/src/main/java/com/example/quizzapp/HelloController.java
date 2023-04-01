package com.example.quizzapp;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.scene.text.TextFlow;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.URL;
import java.util.ResourceBundle;

public class HelloController implements Initializable {
    @FXML
    private Label welcomeText;
    @FXML
    private VBox vBox;
    @FXML
    private TextArea serverLogs;

    private Server server;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        try {
            server = new Server(new ServerSocket(5000));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error launching server");
        }

        server.receiveAnswerFromUser(serverLogs);
    }

    public static void addLabel(String answerFromClient, TextArea textArea) {
//        HBox hBox = new HBox();
//        hBox.setAlignment(Pos.CENTER_LEFT);
//
//        Text text = new Text(answerFromClient);
//        TextFlow textFlow = new TextFlow(text);
//        hBox.getChildren().add(textFlow);

        Platform.runLater(new Runnable() {
            @Override
            public void run() {
//                vBox.getChildren().add(hBox);
                textArea.setText(answerFromClient);
            }
        });
    }
}
