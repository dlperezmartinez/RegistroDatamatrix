package com.registrodatamatrix.backend.controlador;

import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.registrodatamatrix.backend.services.DBService;

import java.util.List;

@RestController
@RequestMapping("/articulos/")
@CrossOrigin
public class ControladorArticulos {

    private final DBService dbService;

    public ControladorArticulos(DBService dbService) {
        this.dbService = dbService;
    }

    @GetMapping("consultar")
    public ResponseEntity<List<Articulo>> consultar(String opcion, Long id) {

        List<Articulo> respuesta = null;

        switch (opcion) {
            case "todo":
                // Se hace la petición al servicio.
                respuesta = dbService.consultarArticulos();

                // Se envía la respuesta.
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
            case "por-id":
                // Se hace la petición al servicio.
                respuesta = List.of(dbService.consultarArticuloPorId(id));

                // Se envía la respuesta.
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
        }
        return null;
    }

    @PostMapping("insertar")
    public ResponseEntity<Articulo> insertar(@RequestBody Articulo articulo) {

        // Se hace la petición al servicio.
        Articulo respuestaArticulo = dbService.insertarArticulo(articulo);

        // Se envía la respuesta.
        return new ResponseEntity<>(respuestaArticulo, HttpStatus.CREATED);
    }

    @PutMapping("actualizar")
    public ResponseEntity<Articulo> actualizar(@RequestBody Articulo articulo) {
        Articulo respuesta = dbService.actualizarArticulo(articulo);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("eliminar")
    public ResponseEntity<?> eliminar(Long id) {

        // Se hace la petición al servicio.
        dbService.eliminarArticulo(id);

        // Se envía la respuesta.
        return new ResponseEntity<>(HttpStatus.OK);
    }
}