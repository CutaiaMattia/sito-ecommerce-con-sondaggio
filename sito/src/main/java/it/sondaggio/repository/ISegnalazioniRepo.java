package it.sondaggio.repository;


import it.sondaggio.model.Segnalazioni;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISegnalazioniRepo extends JpaRepository<Segnalazioni, Integer> {

    public List<Segnalazioni> getByIdSegnalazione(int idSegnalazione);
    public void deleteByIdSegnalazione(int idSegnalazione);
}
