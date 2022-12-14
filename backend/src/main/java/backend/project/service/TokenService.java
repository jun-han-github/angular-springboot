package backend.project.service;

import backend.project.entity.Token;
import backend.project.repository.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TokenService {

    private final TokenRepository repository;

    public void saveToken(Token token) {
        repository.save(token);
    };

    public Optional<Token> getToken(String token) {
        return repository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return repository.updateConfirmedAt(token, LocalDateTime.now());
    }
}
