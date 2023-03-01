package it.negozio.service;

import it.negozio.model.Immagine;
import it.negozio.model.Prodotto;
import it.negozio.repository.IImmagineRepository;
import it.negozio.repository.IProdottoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImmagineService implements IImmagineService {
    private IImmagineRepository iImmagineRepository;
    private IProdottoRepository iProdottoRepository;

    public ImmagineService(IImmagineRepository iImmagineRepository,IProdottoRepository iProdottoRepository){
        this.iImmagineRepository = iImmagineRepository;
        this.iProdottoRepository = iProdottoRepository;
    }

    @Override
    public List<Immagine> getAll() {
        return iImmagineRepository.findAll();
    }

    @Override
    public Optional<Immagine> getById(int id) {
        Optional<Immagine> prodottoOptional = iImmagineRepository.findById(id);
        if (prodottoOptional.isPresent()) {
            return prodottoOptional;
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Boolean save(Immagine immagine) {
        Optional<Immagine> immagineOptional = iImmagineRepository.findById(immagine.getId());
        if (immagineOptional.isPresent()) {
            return false;
        } else {
            Optional<Prodotto> p = iProdottoRepository.findById(immagine.getProdotto().getId());
            if(p.isPresent()){
                iImmagineRepository.save(immagine);
                return true;
            } else {

                return false;
            }

        }

    }

    @Override
    public Boolean update(Immagine immagine) {
        Optional<Immagine> immagineOptional = iImmagineRepository.findById(immagine.getId());
        if (immagineOptional.isPresent()) {
            Optional<Prodotto> p = iProdottoRepository.findById(immagine.getProdotto().getId());
            if (p.isPresent()) {
                iImmagineRepository.save(immagineOptional.get());
                return true;
            } else {
                System.out.println("prodotto non trovato");
                return false;
            }
        } else {
            System.out.println("immagine non trovata");
            return false;
        }
    }

    @Override
    public Boolean delete(int id) {
        Optional<Immagine> immagineOptional = iImmagineRepository.findById(id);
        if (immagineOptional.isPresent()) {
            iImmagineRepository.delete(immagineOptional.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Immagine>  getUrlByIdProdotto(int idProdotto){
        List<Immagine> immagini = new ArrayList<>();
        for(Immagine immagine :getAll()){
            if(immagine.getProdotto().getId() == idProdotto){
                immagini.add(immagine);
            }

        }
        return immagini;
    }
}
