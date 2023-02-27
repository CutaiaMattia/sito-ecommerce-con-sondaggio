package it.sondaggio.service;

import it.sondaggio.model.Segnalazioni;

import java.util.List;

public interface ISegnalazioniService {

    public List<Segnalazioni> getAll();
    public Segnalazioni getById(int id);


    public Segnalazioni insert(Segnalazioni segnalazioni);

    public List<Segnalazioni> getByIdSegnalazione(int idSegnalazione);

    public void deleteAllByIdSegnalazione( int idSegnalazione);

    public Boolean deleteById(int id);

}
