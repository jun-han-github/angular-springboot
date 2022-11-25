package backend.project.service;

import backend.project.entity.Employee;
import backend.project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public List<Employee> addEmployees(List<Employee> employees) {
        return repository.saveAll(employees);
    }
}