package it.sondaggio.controller;

import it.sondaggio.service.IDomandeService;
import it.sondaggio.model.Domande;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/domande")
@CrossOrigin(allowedHeaders = {"*"})
public class DomandeController {


    private IDomandeService iDomandeService;

    public DomandeController(IDomandeService iDomandeService) {
        this.iDomandeService = iDomandeService;
    }


    @GetMapping("/pagina/{percorso}/{page}")
    public List<Domande> getPagine(@PathVariable int page,@PathVariable int percorso){
        return iDomandeService.getAll(page,percorso);
    }


    @GetMapping("/maxPagineForPercorso/{percorso}")
    public float getMaxPage(@PathVariable int percorso){
        return iDomandeService.getMaxPageForPercorso(percorso);
    }


/*
    @GetMapping("/domandaSceltaPercorso")
    public Domande getDomandaSceltaPercorso(){
        return iDomandeService.getById(1);
    }

    @GetMapping("/percorso1/domande1")
    public List<Domande> getPrimeDomandePercorso1(){
        return iDomandeService.getPrimeDomandePercorso1();
    }

    @GetMapping("/percorso1/domande2")
    public List<Domande> getSecondeDomandePercorso1(){
        return iDomandeService.getSecondeDomandePercorso1();
    }

    @GetMapping("/percorso1/domande3")
    public List<Domande> getTerzeDomandePercorso1(){
        return iDomandeService.getTerzeDomandePercorso1();
    }

    @GetMapping("/percorso2/domande1")
    public List<Domande> getPrimeDomandePercorso2(){
        return iDomandeService.getPrimeDomandePercorso2();
    }

    @GetMapping("/percorso2/domande2")
    public List<Domande> getSecondeDomandePercorso2(){
        return iDomandeService.getSecondeDomandePercorso2();
    }

    @GetMapping("/percorso2/domande3")
    public List<Domande> getTerzeDomandePercorso2(){
        return iDomandeService.getTerzeDomandePercorso2();
    }



*/

}
