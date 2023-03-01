package it.negozio.service;




import it.negozio.model.Immagine;

import java.util.List;
import java.util.Optional;

public interface IImmagineService {

    public List<Immagine> getAll();
    public Optional<Immagine> getById(int id);
    public Boolean save(Immagine immagine);
    public Boolean update(Immagine immagine);
    public Boolean delete(int id);
    public List<Immagine>  getUrlByIdProdotto(int idProdotto);
}
