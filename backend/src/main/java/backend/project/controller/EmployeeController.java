package backend.project.controller;

import backend.project.entity.Employee;
import backend.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    @PostMapping("/employees/create")
    public String addEmployees(@RequestBody List<Employee> employees) {
        try {
            service.addEmployees(employees);
            return "Employees uploaded successfully";
        } catch(Exception e) {
            return e.getMessage();
        }
    }
}
