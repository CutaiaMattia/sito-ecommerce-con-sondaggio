package it.sondaggio.service;

import it.sondaggio.model.Domande;

import java.util.Comparator;

public class ComparatoreStep implements Comparator<Domande> {


    @Override
     public int compare(Domande d, Domande d1) {
        return d.getStep() - d1.getStep();
    }
}
