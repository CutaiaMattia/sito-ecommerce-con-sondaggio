package it.negozio.repository;

import it.negozio.model.Immagine;
import it.negozio.model.Prodotto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImmagineRepository extends JpaRepository<Immagine,Integer> {


public List<Immagine> findByProdotto(Prodotto prodotto);




}
