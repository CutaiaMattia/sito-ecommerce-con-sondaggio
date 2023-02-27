package it.sondaggio.service;


import it.sondaggio.model.Domande;

import java.util.List;

public interface IDomandeService {

    public Domande getById(int id);
    public List<Domande> getPrimeDomandePercorso1();
    public List<Domande> getSecondeDomandePercorso1();
    public List<Domande> getTerzeDomandePercorso1();

    public List<Domande> getPrimeDomandePercorso2();
    public List<Domande> getSecondeDomandePercorso2();
    public List<Domande> getTerzeDomandePercorso2();
    public List<Domande> getAll(int page,int percorso);
    public List<Domande> getByPercorso(int percorso, int page, int pageSize);

    public float getMaxPageForPercorso(int percorso);





}
