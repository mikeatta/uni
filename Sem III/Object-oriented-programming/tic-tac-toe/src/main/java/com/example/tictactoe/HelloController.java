package com.example.tictactoe;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
    public Button startResetBtn;


    @FXML
    protected Label playerMove;

    // Program methods
    Random random = new Random();

    // Game variables
    String currentMove = null; // Draw first player to make a move
    String nextMove = null; // Store next player's move
    int turns = 0; // Count amount of turns taken
    char checkLastTurn;
    String winningLine = null;

    // ID variables
    String turnName = null; // Store player acronym
    String buttonId = null; // Store entire button ID

    // Position array
    char[][] matrix = new char[3][3];

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
            setNextMove();
            turns++;
        }
        // While turns are under 8
        else if (turns <= 8) {
            playerMove.setText("Player move: " + this.currentMove);
            setNextMove();
            turns++;
        }
        // If turns are equal to 8
        else if (turns == 9) {
            playerMove.setText("The game has ended (" + turns + " turns)");
            turns = 0;
        }

        countMoves.setText("Turns taken: " + this.turns);
    }

    // Disable button after being clicked
    @FXML
    void btnAction(ActionEvent event) {
        // Store selection positions
        char row, col;
        int rowPos, colPos;

        // Get ID's from clicked buttons
        Button b = (Button) event.getSource();
        buttonId = b.getId();
        b.setDisable(true);
        this.setTurnPermissions();

        // Extract rows and cols from the entire button ID
        row = buttonId.charAt(5);
        col = buttonId.charAt(8);

        // Extract value from char
        rowPos = Character.getNumericValue(row);
        colPos = Character.getNumericValue(col);
        System.out.println("Row: " + row + " Col: " + col);

        // Pass position to the matrix
        playerChoiceMatrix(rowPos, colPos, currentMove);

        // Set button content to player acronym
        if (currentMove.equals("circle")) turnName = "O";
        else if (currentMove.equals("cross")) turnName = "X";
        b.setText(turnName);
    }

    // Fill matrix with corresponding player turn ID's
    protected void playerChoiceMatrix(int posRow, int posCol, String currentPlayerMove) {
        if (currentPlayerMove.equals("circle")) matrix[posRow][posCol] = 'O';
        else if (currentPlayerMove.equals("cross")) matrix[posRow][posCol] = 'X';

        // Start checking for winners after three turns
        if (turns >= 3) this.checkForWinner(matrix, posRow, posCol);
    }

    protected void checkForWinner(char[][] matrix, int lastMatrixRow, int lastMatrixCol) {
        // Get character from last turn
        checkLastTurn = matrix[lastMatrixRow][lastMatrixCol];

        // Declare a winning line
        winningLine = String.valueOf(checkLastTurn).repeat(3);

        // Horizontal lines to check
        String line0 = "" + matrix[0][0] + matrix[0][1] + matrix[0][2];
        String line1 = "" + matrix[1][0] + matrix[1][1] + matrix[1][2];
        String line2 = "" + matrix[2][0] + matrix[2][1] + matrix[2][2];

        // Vertical lines to check
        String line3 = "" + matrix[0][0] + matrix[1][0] + matrix[2][0];
        String line4 = "" + matrix[0][1] + matrix[1][1] + matrix[2][1];
        String line5 = "" + matrix[0][2] + matrix[1][2] + matrix[2][2];

        // Across lines to check
        String line6 = "" + matrix[0][0] + matrix[1][1] + matrix[2][2];
        String line7 = "" + matrix[1][2] + matrix[1][1] + matrix[2][0];

        // Create a list to store all winning line combinations
        List<String> lineList = new ArrayList<>(Arrays.asList(line0, line1, line2, line3, line4, line5, line6, line7));

        // Compare every line to the winning line pattern
        for (String line:lineList) {
            if (line.equals(winningLine)) {
                char winner = winningLine.charAt(0);
                endGame(winner);
                System.out.println("Winning line found! Winner: " + winner);
            }
        }
    }

    // Disable buttons, show results and send reset prompt
    protected void endGame(char winner) {
        // Create list with every game button
        List<Button> buttonList = new ArrayList<>(Arrays.asList(btn_R0_C0, btn_R0_C1, btn_R0_C2, btn_R1_C0, btn_R1_C1, btn_R1_C2, btn_R2_C0, btn_R2_C1, btn_R2_C2));

        // Disable every button
        for (Button button:buttonList) {
            button.setDisable(true);
        }

        // Change text on score buttons and text fields
        playerMove.setText("The end! The winner of this round is: " + winner);
        startResetBtn.setText("Reset");

        startResetBtn.setOnAction(actionEvent -> resetGame(buttonList));
    }

    // Reset game counter variables and button functions
    protected void resetGame(List<Button> resetButtons) {
        // Reset variables and clear the matrix
        turns = 0;
        winningLine = null;
        matrix = new char[3][3];

        // Re-enable buttons and reset text fields
        for (Button buttons:resetButtons) {
            buttons.setText("");
            buttons.setDisable(false);
        }

        // Set button text fields and actions
        playerMove.setText("Player's move shows up here...");
        countMoves.setText("");
        startResetBtn.setText("Draw first move");
        startResetBtn.setOnAction(actionEvent -> setTurnPermissions());
    }

}