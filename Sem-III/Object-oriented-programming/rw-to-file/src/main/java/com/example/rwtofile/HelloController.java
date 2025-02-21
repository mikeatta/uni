package com.example.rwtofile;

import javafx.fxml.FXML;
import javafx.scene.control.TextArea;

import java.io.*;
import java.util.Scanner;

public class HelloController {

    // Define file path
    String filePath = "./file-directory/file.txt";
    @FXML
    public TextArea textArea;

    @FXML
    private void readFromFile() throws FileNotFoundException {
        // If file is present, read from file
        if (checkForFile()) {
            File myFile = new File(filePath);
            Scanner sc = new Scanner(myFile);
            sc.useDelimiter("\\Z");

            if (sc.hasNext() == false) {
                // Let user know the file has no content
                System.out.println("File is empty.");
            } else textArea.setText(sc.next());
        } else checkForFile();
    }

    @FXML
    private void writeToFile() {
        // Get text from input field
        String text = textArea.getText();

        try {
            // Write to file
            FileWriter myWriter = new FileWriter(filePath);
            myWriter.write(text);
            // Close the file
            myWriter.close();
            System.out.println("Successfully written to file!");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    private boolean checkForFile() {
        try {
            File myFile = new File(filePath);
            // Return false, if file was not found
            if ((!myFile.exists() || myFile.isDirectory()) && myFile.createNewFile()) {
                System.out.println("File not found!\nCreating a new file!");
                return false;
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        // Return true, if file was found
        return true;
    }

}