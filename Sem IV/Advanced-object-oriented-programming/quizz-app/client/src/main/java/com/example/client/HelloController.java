package com.example.client;

import com.example.quizzapp.Client;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.scene.text.TextFlow;

import java.io.IOException;
import java.net.Socket;
import java.net.URL;
import java.util.ResourceBundle;

public class HelloController implements Initializable {
    @FXML
    private Label welcomeText;
    @FXML
    private Button sendButton;
    @FXML
    private TextField answerTextField;
    @FXML
    private VBox vBox;

    private Client client;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

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
                if (!answerToSend.isEmpty()) {
                    HBox hBox = new HBox();
                    hBox.setAlignment(Pos.CENTER_LEFT);

                    Text text = new Text(answerToSend);
                    TextFlow textFlow = new TextFlow(text);

                    hBox.getChildren().add(textFlow);
                    vBox.getChildren().add(hBox);

                    client.sendAnswerToServer(answerToSend);
                    answerTextField.clear();
                }
            }
        });
    }
}