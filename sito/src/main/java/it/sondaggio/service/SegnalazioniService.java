package it.sondaggio.service;

import it.sondaggio.repository.IDomandeRepo;
import it.sondaggio.repository.IPercorsiRepo;
import it.sondaggio.repository.ISegnalazioniRepo;
import it.sondaggio.model.Segnalazioni;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SegnalazioniService implements ISegnalazioniService {

    private ISegnalazioniRepo iSegnalazioniRepo;
    private IDomandeRepo iDomandeRepo;
    private IPercorsiRepo iPercorsiRepo;

    public SegnalazioniService(ISegnalazioniRepo iSegnalazioniRepo,
                               IDomandeRepo iDomandeRepo,
                               IPercorsiRepo iPercorsiRepo) {
        this.iSegnalazioniRepo = iSegnalazioniRepo;
        this.iDomandeRepo = iDomandeRepo;
        this.iPercorsiRepo = iPercorsiRepo;
    }




    @Override
    public List<Segnalazioni> getAll(){
        return iSegnalazioniRepo.findAll();
    }

    @Override
    public Segnalazioni getById(int id) {
        Optional<Segnalazioni> segnalazioniOptional = iSegnalazioniRepo.findById(id);
        if(segnalazioniOptional.isPresent()){
            return segnalazioniOptional.get();
        }
        return null;
    }

    @Override
    public Segnalazioni insert(Segnalazioni segnalazioni) {
        Segnalazioni segnalazioniToSave = new Segnalazioni();
        if(iSegnalazioniRepo.findById(segnalazioni.getId()).isPresent()) {
            return null;
        } else {
            if (iSegnalazioniRepo.getByIdSegnalazione(segnalazioni.getIdSegnalazione()).size() == 0) {
                if (iDomandeRepo.findById(segnalazioni.getDomande().getId()).isPresent()) {
                    segnalazioniToSave.setDomande(iDomandeRepo.findById(segnalazioni.getDomande().getId()).get());
                    segnalazioniToSave.setRisposta(segnalazioni.getRisposta());
                    segnalazioniToSave.setIdSegnalazione(segnalazioni.getIdSegnalazione());
                    }
                } else {

                    for (Segnalazioni segnalazioniForControll : iSegnalazioniRepo.getByIdSegnalazione(segnalazioni.getIdSegnalazione())) {
                        if (segnalazioniForControll.getDomande().getId() == segnalazioni.getDomande().getId()) {
                            segnalazioniToSave.setId(segnalazioniForControll.getId());
                        }
                    }
                    if (iDomandeRepo.findById(segnalazioni.getDomande().getId()).isPresent()) {
                        segnalazioniToSave.setDomande(iDomandeRepo.findById(segnalazioni.getDomande().getId()).get());
                        segnalazioniToSave.setRisposta(segnalazioni.getRisposta());
                        segnalazioniToSave.setIdSegnalazione(segnalazioni.getIdSegnalazione());
                    }
                }
            }
        return iSegnalazioniRepo.save(segnalazioniToSave);
    }





    @Override
    public List<Segnalazioni> getByIdSegnalazione(int idSegnalazione) {
        return iSegnalazioniRepo.getByIdSegnalazione(idSegnalazione);
    }


    @Override
    public void deleteAllByIdSegnalazione(int idSegnalazione) {
       List<Segnalazioni> segnalazioniToDelete =  iSegnalazioniRepo.getByIdSegnalazione(idSegnalazione);
       iSegnalazioniRepo.deleteAll(segnalazioniToDelete);
    }


    @Override
    public Boolean deleteById(int id){
        if(iSegnalazioniRepo.findById(id).isPresent()){
            iSegnalazioniRepo.deleteById(id);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }


}
