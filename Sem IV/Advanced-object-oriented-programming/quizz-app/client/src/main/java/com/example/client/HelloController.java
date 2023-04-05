package com.example.client;

import com.example.quizzapp.Client;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;

import java.io.IOException;
import java.net.Socket;
import java.net.URL;
import java.util.ResourceBundle;

public class HelloController implements Initializable {
    @FXML
    private Button sendButton;
    @FXML
    private TextField answerTextField;
    @FXML
    private TextField nickTextField;

    private Client client;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        try {
            client = new Client(new Socket("localhost", 5000));
            System.out.println("Client connected to server!");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error creating client");
        }

        sendButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent actionEvent) {
                String answerToSend = answerTextField.getText();
                String nickToSend = nickTextField.getText();
                if (!answerToSend.isEmpty()) {
                    client.sendAnswerToServer(answerToSend, nickToSend);
                    answerTextField.clear();
                    nickTextField.clear();
                }
            }
        });
    }
}