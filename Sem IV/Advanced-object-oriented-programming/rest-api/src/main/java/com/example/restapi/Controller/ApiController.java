package com.example.restapi.Controller;

import com.example.restapi.Model.Student;
import com.example.restapi.Repo.StudentRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApiController {

    private final StudentRepo studentRepo;

    public ApiController(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    @GetMapping(value = "/students")
    public List<Student> getStudents() {
        return studentRepo.findAll();
    }

    @GetMapping(value = "/students/{id}")
    public Object getStudent(@PathVariable long id) {
        return studentRepo.findById(id).get();
    }

    @PostMapping(value = "/students")
    public String addStudent(@RequestBody Student student) {
        studentRepo.save(student);
        return "Added new student...";
    }

    @PutMapping(value = "/students/{id}")
    public String updateStudent(@PathVariable long id, @RequestBody Student student) {
        Student updatedStudent = studentRepo.findById(id).get();
        updatedStudent.setFirstName(student.getFirstName());
        updatedStudent.setLastName(student.getLastName());
        updatedStudent.setAge(student.getAge());
        updatedStudent.setSemester(student.getSemester());
        studentRepo.save(updatedStudent);
        return "Updated student #" + id + "...";
    }

    @DeleteMapping(value = "/students/{id}")
    public String removeStudent(@PathVariable long id) {
        Student deleteStudent = studentRepo.findById(id).get();
        studentRepo.delete(deleteStudent);
        return "Deleted student #" + id + "...";
    }
}
