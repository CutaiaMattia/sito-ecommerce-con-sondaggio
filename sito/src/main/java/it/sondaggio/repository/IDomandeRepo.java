package it.sondaggio.repository;

import it.sondaggio.model.Domande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface IDomandeRepo  extends JpaRepository<Domande, Integer> {



    public List<Domande> getDomandeByPercorso(int percorso);


}
