package it.sondaggio.service;

import it.sondaggio.model.Domande;
import it.sondaggio.repository.IDomandeRepo;
import it.sondaggio.repository.ISegnalazioniRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;

import java.util.List;

import java.util.stream.Collectors;


@Service
public class DomandeService implements IDomandeService {

    private IDomandeRepo iDomandeRepo;
    private ISegnalazioniRepo iSegnalazioniRepo;


    public DomandeService(IDomandeRepo iDomandeRepo, ISegnalazioniRepo iSegnalazioniRepo) {
        this.iDomandeRepo = iDomandeRepo;
        this.iSegnalazioniRepo = iSegnalazioniRepo;
    }


    @Override
    public Domande getById(int id) {
        if (iDomandeRepo.findById(id).isPresent()) {
            return iDomandeRepo.findById(id).get();
        }
        return null;
    }


    @Override
    public float getMaxPageForPercorso(int percorso) {
        int totDomande = iDomandeRepo.getDomandeByPercorso(percorso).size();
        float result = totDomande / 3f;
        try {
            String formatResutl = String.valueOf(result).substring(0, 4);
            float castInFloat = Float.valueOf(formatResutl);
            return castInFloat;
        } catch (Exception e) {
            return result;
        }
    }


    @Override
    public List<Domande> getAll(int page, int percorso) {
        return getByPercorso(percorso, page, 3);
    }

    @Override
    public List<Domande> getByPercorso(int percorso, int page, int pageSize) {

        return getPage(iDomandeRepo.getDomandeByPercorso(percorso).stream().sorted((d, d1) -> new ComparatoreStep().compare(d, d1)).collect(Collectors.toList()), page, pageSize);
    }


    public static <T> List<T> getPage(List<T> sourceList, int page, int pageSize) {
        if (pageSize <= 0 || page <= 0) {
            throw new IllegalArgumentException("invalid page size: " + pageSize);
        }

        int fromIndex = (page - 1) * pageSize;
        if (sourceList == null || sourceList.size() <= fromIndex) {
            return Collections.emptyList();
        }

        return sourceList.subList(fromIndex, Math.min(fromIndex + pageSize, sourceList.size()));
    }


}