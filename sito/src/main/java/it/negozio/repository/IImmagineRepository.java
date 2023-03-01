package it.negozio.repository;

import it.negozio.model.Immagine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImmagineRepository extends JpaRepository<Immagine,Integer> {







}
