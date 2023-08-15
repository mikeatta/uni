package com.example.patientlist;

import com.example.patientlist.model.Patient;
import javafx.fxml.FXML;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.json.simple.JSONArray;

public class HelloController {

    @FXML
    private TextField patientName;
    @FXML
    private TextField patientSurname;
    @FXML
    private TextField patientAge;
    @FXML
    private ComboBox<String> sortTypeCombo;

    private final List<Patient> patients = new LinkedList<>();

    @FXML
    private void initialize() {
        setUpComboBox();
    }

    private void setUpComboBox() {
        List<String> sortTypes = new ArrayList<>(4);
        sortTypes.add("Name");
        sortTypes.add("Surname");
        sortTypes.add("Age");
        sortTypes.add("Date added");
        sortTypeCombo.getItems().addAll(sortTypes);
    }

    @FXML
    private void addPatientToList() {
        Patient patient = getPatientInfo();
        if (patient != null) {
            patients.add(patient);
        } else {
            System.err.println("Error adding patient to list");
        }
    }

    private Patient getPatientInfo() {
        String name = patientName.getText();
        String surname = patientSurname.getText();
        String ageText = patientAge.getText();

        if (name.isEmpty() || surname.isEmpty() || ageText.isEmpty()) {
            return null;
        }

        int age;
        try {
            age = Integer.parseInt(ageText);
            if (age < 0) {
                throw new NumberFormatException("Error: Invalid input");
            }
        } catch (NumberFormatException e) {
            System.err.println(e.getMessage());
            e.printStackTrace(System.err);
            return null;
        }

        return new Patient(name, surname, age);
    }

    private String getComboBoxValue() {
        return String.valueOf(sortTypeCombo.getValue());
    }

    private List<Patient> orderPatientList(String orderType) {
        List<Patient> orderedPatients = new LinkedList<>();
        switch (orderType) {
            case "Name" -> System.out.println("Selected 'Name'");
            case "Surname" -> System.out.println("Selected 'Surname'");
            case "Age" -> System.out.println("Selected 'Age'");
            case "Date added" -> System.out.println("Selected 'Date added'");
            default -> System.err.println("Please select order type!");
        }
        return orderedPatients;
    }

    private String parseListToJSON(List<Patient> patientList) {
        JSONArray patientJsonArray = new JSONArray();

        patientList.forEach(patient -> {
            HashMap<String, Object> patientMap = new HashMap<>();
            patientMap.put("Name", patient.getName());
            patientMap.put("Surname", patient.getSurname());
            patientMap.put("Age", patient.getAge());
            patientJsonArray.add(patientMap);
        });

        String jsonPatientList = patientJsonArray.toJSONString();
        jsonPatientList = jsonPatientList.substring(1, jsonPatientList.length() - 1);

        return jsonPatientList;
    }

    @FXML
    private void displayPatientInfo() {
//        String comboValue = getComboBoxValue();
//        orderPatientList(comboValue);
        String jsonPatientList = parseListToJSON(patients);
        System.out.print(jsonPatientList);
    }

}