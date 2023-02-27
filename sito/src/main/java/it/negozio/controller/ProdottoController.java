package it.negozio.controller;

import it.negozio.data.dto.ProdottoDto;
import it.negozio.data.model.Prodotto;
import it.negozio.service.IProdottoService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/prodotto")
public class ProdottoController {


    private IProdottoService iProdottoService;

    public ProdottoController(IProdottoService iProdottoService){
        this.iProdottoService = iProdottoService;
    }


    @GetMapping
    public List<ProdottoDto> getAll(){
        List<ProdottoDto> prodottoDtoList = new ArrayList<>();
        List<Prodotto> prodottoList = iProdottoService.getAll();
        for(Prodotto prodottoToDto : prodottoList){
           ProdottoDto prodottoToShow = prodottoToDto.toDto();
            prodottoDtoList.add(prodottoToShow);
        }
        return prodottoDtoList;
    }

    @PostMapping
    public boolean save(@RequestBody ProdottoDto prodottoDto){
       return iProdottoService.insert(prodottoDto.toModel());
    }


     @GetMapping("/{id}")
     public ProdottoDto getById(@PathVariable int id){
     return iProdottoService.getById(id).get().toDto();
      }


}
