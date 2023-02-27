package it.sondaggio.service;


import it.sondaggio.model.Percorsi;

import java.util.List;

public interface IPercorsiService {

    public List<Percorsi> getAll();
    public Percorsi getById(int id);


}
