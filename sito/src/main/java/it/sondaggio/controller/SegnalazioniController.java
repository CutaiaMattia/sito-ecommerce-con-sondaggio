package it.sondaggio.controller;

import it.sondaggio.model.Segnalazioni;
import it.sondaggio.model.requestModel.SegnalazioneInsertRequest;
import it.sondaggio.service.ISegnalazioniService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/segnalazioni")
@CrossOrigin(allowedHeaders = {"*"})
public class SegnalazioniController {
    private ISegnalazioniService iSegnalazioniService;

    public SegnalazioniController(ISegnalazioniService iSegnalazioniService) {
        this.iSegnalazioniService = iSegnalazioniService;
    }

    @PostMapping
    public Segnalazioni insert(@RequestBody SegnalazioneInsertRequest segnalazioni) {
        return iSegnalazioniService.insert(segnalazioni.toSegnalazione());
    }

    @GetMapping("/all")
    public List<Segnalazioni> getAll(){
        return iSegnalazioniService.getAll();
    }

    @GetMapping("/{idSegnalazione}")
    public List<Segnalazioni> getByIdSegnalazione(@PathVariable int idSegnalazione){
        List<Segnalazioni> segnalazioni = iSegnalazioniService.getByIdSegnalazione(idSegnalazione);
        return segnalazioni;
    }
    @DeleteMapping("/{id}")
    public Boolean deleteById(@PathVariable int id){
       return iSegnalazioniService.deleteById(id);
    }

    @DeleteMapping("/idSegnalazione/{idSegnalazione}")
    public void deleteAllByIdSegnalazione(@PathVariable int idSegnalazione){
        iSegnalazioniService.deleteAllByIdSegnalazione(idSegnalazione);
    }


}
