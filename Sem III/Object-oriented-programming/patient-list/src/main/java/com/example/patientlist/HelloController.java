package com.example.patientlist;

import com.example.patientlist.model.Patient;
import com.google.gson.*;
import javafx.fxml.FXML;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;

import java.util.*;

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
        List<Patient> orderedPatients = new LinkedList<>(patients);
        switch (orderType) {
            case "Name" -> {
                Comparator<Patient> compareByName = Comparator.comparing(Patient::getName);
                orderedPatients.sort(compareByName);
            }
            case "Surname" -> {
                Comparator<Patient> compareBySurname = Comparator.comparing(Patient::getSurname);
                orderedPatients.sort(compareBySurname);
            }
            case "Age" -> {
                Comparator<Patient> compareByAge = Comparator.comparing(Patient::getAge);
                orderedPatients.sort(compareByAge);
            }
            case "Date added" -> {
                return orderedPatients;
            }
            default -> System.err.println("Please select order type!");
        }
        return orderedPatients;
    }

    private String parseListToJSON(List<Patient> patientList) {
        JsonArray patientJsonArray = new JsonArray();

        patientList.forEach(patient -> {
            JsonObject patientObject = new JsonObject();
            patientObject.add("Name", new JsonPrimitive(patient.getName()));
            patientObject.add("Surname", new JsonPrimitive(patient.getSurname()));
            patientObject.add("Age", new JsonPrimitive(patient.getAge()));
            patientJsonArray.add(patientObject);
        });

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(patientJsonArray);
    }

    @FXML
    private void displayPatientInfo() {
        String comboValue = getComboBoxValue();
        List<Patient> orderedPatients = orderPatientList(comboValue);
        String jsonPatientList = parseListToJSON(orderedPatients);
        System.out.print("Ordered patient list:\n" + jsonPatientList + "\n\n");
    }

}