package hcmut.hcmut_spss.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import hcmut.hcmut_spss.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    
} 