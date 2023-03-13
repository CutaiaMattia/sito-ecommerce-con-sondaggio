package it.negozio.repository;
import it.negozio.model.Prodotto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProdottoRepository extends JpaRepository<Prodotto,Integer> {


}
