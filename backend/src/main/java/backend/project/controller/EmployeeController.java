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

    @GetMapping("/users")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    @PostMapping("/users/upload")
    public List<Employee> addEmployees(@RequestBody List<Employee> employees) {
        return service.addEmployees(employees);
    }

    @PatchMapping("/users")
    public Employee updateEmployee(@RequestBody Employee employee) {
        return service.updateEmployee(employee);
    }

    @DeleteMapping("/users/{id}")
    public Employee deleteEmployee(@PathVariable String id) {
        return service.deleteEmployee(id);
    }
}
