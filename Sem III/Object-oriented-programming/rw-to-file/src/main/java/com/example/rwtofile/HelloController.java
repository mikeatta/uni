package com.example.rwtofile;

import javafx.fxml.FXML;
import javafx.scene.control.TextArea;

import java.io.File;
import java.io.IOException;

public class HelloController {
    @FXML
    public TextArea textArea;

    @FXML
    private void getTextAreaValue() {
        String text = textArea.getText();
        System.out.println(text);
        createFile();
    }

    private void createFile() {
        try {
            // Create new file at set directory
            File myFile = new File("./file-directory/file.txt");
            // If file exists and is not a directory
            if(myFile.exists() && !myFile.isDirectory()) {
                System.out.println("File already exists! Aborting...");
            } else myFile.createNewFile();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

}