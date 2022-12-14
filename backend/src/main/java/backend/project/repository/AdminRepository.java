package backend.project.repository;

import backend.project.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Admin a SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAdmin(String email);
}
