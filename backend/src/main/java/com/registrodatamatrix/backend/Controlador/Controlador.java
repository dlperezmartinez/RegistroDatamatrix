package com.registrodatamatrix.backend.Controlador;

import com.registrodatamatrix.backend.DB.Repositorios.*;
import com.registrodatamatrix.backend.DB.Tablas.Articulo;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;

import com.registrodatamatrix.backend.Services.DBService;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin
public class Controlador {

    private final ArticuloRepository articuloRepository;
    private final RevisionRepository revisionRepository;

    public Controlador(ArticuloRepository articuloRepository, RevisionRepository revisionRepository) {
        this.articuloRepository = articuloRepository;
        this.revisionRepository = revisionRepository;
    }

    @Autowired
    DBService dbService;

    @GetMapping("consultar")
    public List<Articulo> consultar(String accion) {

        switch (accion) {
            case "articulos":
                return (List<Articulo>) articuloRepository.findAll();
            case "revisiones":
                @Query("SELECT ") //TODO: Terminar esto.
                return revisionRepository.findAll();

        }
    }

    @PostMapping
    public boolean insertar(String accion, Collection datos) { //TODO: Creo que esta Collection no es la que toca.
        return true;
    }
}