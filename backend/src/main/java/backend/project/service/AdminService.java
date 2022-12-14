package backend.project.service;

import backend.project.entity.Admin;
import backend.project.entity.Token;
import backend.project.repository.AdminRepository;
import backend.project.request.LoginRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AdminService implements UserDetailsService {

    @Autowired
    private final AdminRepository repository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenService tokenService;
    private final static String USER_NOT_FOUND_MESSAGE = "User with email %s not found";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    public UserDetails loadAdminByEmail(String email) {
        return repository
                .findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MESSAGE, email)));
    }

    public String login(LoginRequest request) throws Exception {
        Admin admin = repository.findByEmail(request.getEmail()).orElse(null);
        if (admin == null) {
            throw new Exception("Email does not exist");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        boolean isAuthenticated = encoder.matches(request.getPassword(), admin.getPassword());
        if (!isAuthenticated) {
            throw new Exception("Incorrect credentials");
        }

        String token = UUID.randomUUID().toString();
        Token confirmationToken = new Token(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                admin
        );
        tokenService.saveToken(confirmationToken);

        return token;
    }

    public String registerAdmin(Admin admin) {
        boolean adminExist = repository.findByEmail(admin.getEmail()).isPresent();

        if (adminExist) {
            // TODO: Check if attributes are the same,
            // TODO: If email not confirmed, send confirmation email
            throw new IllegalStateException("This email was already taken");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(admin.getPassword());
        admin.setPassword(encodedPassword);
        repository.save(admin);

        String token = UUID.randomUUID().toString();
        Token confirmationToken = new Token(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                admin
        );
        tokenService.saveToken(confirmationToken);

        // TODO: Send email

        return token;
    }

    public int enableAdmin(String email) {
        return repository.enableAdmin(email);
    }
}
