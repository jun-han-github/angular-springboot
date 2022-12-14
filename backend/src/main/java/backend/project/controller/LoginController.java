package backend.project.controller;

import backend.project.request.LoginRequest;
import backend.project.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/admin/login")
@AllArgsConstructor
public class LoginController {

    private AdminService service;

    @PostMapping
    public String login(@RequestBody LoginRequest request) throws Exception {
        return service.login(request);
    }
}
