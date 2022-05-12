package com.registrodatamatrix.backend.controlador;

import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import com.registrodatamatrix.backend.services.DBService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/revisiones/")
@CrossOrigin
public class ControladorRevisiones {

    private final DBService dbService;

    public ControladorRevisiones(DBService dbService) {
        this.dbService = dbService;
    }

    @GetMapping("consultar")
    public ResponseEntity<List<Revision>> consultar(Long id) {

        List<Revision> respuesta = List.of(dbService.consultarRevisionesPorId(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //TODO: Mirar lo de ResponseEntity<List<Revision>> (Quizás no haga falta devolver listas siempre).
    @PostMapping("insertar")
    public ResponseEntity<List<Revision>> insertar(@RequestBody Revision revision) {

        List<Revision> respuestaRevision = List.of(dbService.insertarRevision(revision));
        return new ResponseEntity<>(respuestaRevision, HttpStatus.CREATED);
    }

    @PutMapping("actualizar")
    public ResponseEntity<Revision> actualizar(@RequestBody Revision revision) {
        Revision respuesta = dbService.actualizarRevision(revision);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
