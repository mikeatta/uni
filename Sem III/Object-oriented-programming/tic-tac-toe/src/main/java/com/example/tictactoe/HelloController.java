package com.example.tictactoe;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

import java.util.Random;

public class HelloController {

    public Label countMoves;
    public Button btn_R0_C0;
    public Button btn_R0_C1;
    public Button btn_R0_C2;
    public Button btn_R1_C0;
    public Button btn_R1_C1;
    public Button btn_R1_C2;
    public Button btn_R2_C0;
    public Button btn_R2_C1;
    public Button btn_R2_C2;

    @FXML
    private Label welcomeText;

    @FXML
    protected Label playerMove;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    // Program methods
    Random random = new Random();

    // Game variables
    String currentMove = null; // Draw first player to make a move
    String nextMove = null; // Store next player's move
    int turns = 0; // Count amount of turns taken

    // Decide which player makes the first move
    protected void drawTurn() {
        String drawnTurn;
        boolean drawMove = random.nextBoolean();
        if (drawMove) drawnTurn = "circle";
        else drawnTurn = "cross";
        this.currentMove = drawnTurn;
    }

    protected void setNextMove() {
        if (currentMove.equals("circle")) nextMove = "cross";
        else nextMove = "circle";
        this.currentMove = nextMove;
    }

    // Count turns and display end game message
    @FXML
    protected void setTurnPermissions() {
        // Set first player to make a move
        if (turns == 0) {
            drawTurn();
            playerMove.setText("Player move: " + this.currentMove);
            turns++;
        }
        // While turns are under 8
        else if (turns <= 7) {
            setNextMove();
            playerMove.setText("Player move: " + this.currentMove);
            turns++;
        }
        // If turns are equal to 8
        else if (turns == 8) {
            playerMove.setText("The game has ended (" + turns + 1 + " turns)");
            turns = 0;
        }

        countMoves.setText("Moves: " + this.turns);
    }

    // Disable button after being clicked
    @FXML
    void btnAction(ActionEvent event) {
        Button b = (Button) event.getSource();
        b.setDisable(true);
        this.welcomeText.setText("Id : " + b);
        this.setTurnPermissions();
    }

}