package it.negozio.repository;
import it.negozio.data.model.Prodotto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProdottoRepository extends JpaRepository<Prodotto,Integer> {
}
