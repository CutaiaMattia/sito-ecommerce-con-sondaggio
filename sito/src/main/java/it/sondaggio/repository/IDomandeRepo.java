package it.sondaggio.repository;

import it.sondaggio.model.Domande;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface IDomandeRepo  extends JpaRepository<Domande, Integer> {
public static final String query = "SELECT * form domande where ?";

@Query(value = query, nativeQuery = true)


    public List<Domande> getByPercorso(int id, Pageable pageable);


}
