package it.negozio.controller;

import it.negozio.data.dto.ImmagineDto;
import it.negozio.data.model.Immagine;
import it.negozio.service.IImmagineService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/immagine")
public class ImmagineController {

    private IImmagineService iImmagineService;

    public ImmagineController(IImmagineService iImmagineService){
        this.iImmagineService = iImmagineService;
    }


    @GetMapping("/all")
    public List<ImmagineDto> getAll(){
        List<ImmagineDto> immagineDtoList = new ArrayList<>();
        List<Immagine> immagineList = iImmagineService.getAll();
        for(Immagine immagineToDto : immagineList){
           ImmagineDto immagineToShow = immagineToDto.toDto();
            immagineDtoList.add(immagineToShow);
        }
        return immagineDtoList;
    }



     @GetMapping("/{id}")
     public ImmagineDto getById(@PathVariable int id){
     return iImmagineService.getById(id).get().toDto();
      }


      @GetMapping
    public List<String> getAllByIdProdotto(int idProdotto){
        return iImmagineService.getUrlByIdProdotto(idProdotto);
      }
}
