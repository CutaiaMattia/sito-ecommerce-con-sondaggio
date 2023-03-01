package it.negozio.service;



import it.negozio.model.Prodotto;

import java.util.List;
import java.util.Optional;

public interface IProdottoService {

    public List<Prodotto> getAll();
    public Optional<Prodotto> getById(int id);

    public Boolean update(Prodotto prodotto);
    public Boolean delete(int id);

}
