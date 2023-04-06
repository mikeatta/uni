package com.example.quizzapp;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.TextArea;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.URL;
import java.util.ResourceBundle;

public class HelloController implements Initializable {
    @FXML
    public TextArea serverLogs;

    private Server server;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        try {
            System.out.println("Server started. Waiting for client to connect ...");
            server = new Server(new ServerSocket(5000));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error launching server");
        }

        try {
            server.loadQuestion(serverLogs);
            server.receiveAnswerFromUser(serverLogs);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void displayClientAnswer(StringBuilder clientMessage, TextArea textArea) {

        clientMessage.append("\n");

        Platform.runLater(() -> textArea.setText(clientMessage.toString()));
    }
}
