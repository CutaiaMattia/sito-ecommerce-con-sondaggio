package it.sondaggio.controller;



import it.sondaggio.service.IPercorsiService;
import it.sondaggio.model.Percorsi;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/percorsi")
@CrossOrigin(allowedHeaders = {"*"})
public class PercorsiController {


    private IPercorsiService iPercorsiService;


    public PercorsiController(IPercorsiService iPercorsiService) {
        this.iPercorsiService = iPercorsiService;
    }



    @GetMapping("/getResult1")
    public Percorsi getResult1(){
       return iPercorsiService.getById(2);
    }


    @GetMapping("/getResult2")
    public Percorsi getResult2(){
       return iPercorsiService.getById(3);
    }


}
