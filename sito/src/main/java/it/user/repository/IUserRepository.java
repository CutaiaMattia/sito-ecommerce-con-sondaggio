package it.user.repository;


import it.user.model.User;
import it.user.model.response.ResponseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}
