package com.registrodatamatrix.backend.controlador;

import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.registrodatamatrix.backend.services.DBService;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin
public class Controlador {

    private final DBService dbService;

    public Controlador(DBService dbService) {
        this.dbService = dbService;
    }

    @GetMapping("consultar")
    public ResponseEntity<List<?>> consultar(String elemento, Long id) {

        List<?> respuesta = null;

        switch (elemento) {
            case "articulos":
                respuesta = dbService.consultarArticulos();
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
            case "articulo-por-id":
                respuesta = List.of(dbService.consultarArticuloPorId(id));
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
            case "revisiones":
                respuesta = List.of(dbService.consultarRevisionesPorId(id));
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
        }
        return null;
    }

    @PostMapping("insertar")
    public ResponseEntity<List<?>> insertar(String elemento, @RequestBody Object object) {

        switch (elemento) {
            case "articulo":
                List<Articulo> respuestaArticulo = List.of(dbService.insertarArticulo(object));
                return new ResponseEntity<>(respuestaArticulo, HttpStatus.CREATED);
            case "revision":
                List<Revision> respuestaRevision = List.of(dbService.insertarRevision((Revision) object));
                return new ResponseEntity<>(respuestaRevision, HttpStatus.CREATED);
        }
        return null;
    }

    //TODO: PUT

    @DeleteMapping("eliminar")
    public ResponseEntity<?> eliminar(String elemento, Long id) {

        switch (elemento) {
            case "articulo":
                dbService.eliminarArticulo(id);
                return new ResponseEntity<>(HttpStatus.OK);
            case "revision":
                return null;
        }
        return null;

    }

    }