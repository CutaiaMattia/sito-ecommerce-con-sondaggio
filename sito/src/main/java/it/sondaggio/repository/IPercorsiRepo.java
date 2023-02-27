package it.sondaggio.repository;


import it.sondaggio.model.Percorsi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPercorsiRepo extends JpaRepository<Percorsi,Integer> {
}
