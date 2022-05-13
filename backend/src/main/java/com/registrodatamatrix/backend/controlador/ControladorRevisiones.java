package com.registrodatamatrix.backend.controlador;

import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import com.registrodatamatrix.backend.services.DBService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    public ResponseEntity<List<Date>> consultar(String opcion, @RequestBody Articulo articulo) {

        switch (opcion) {
            case "todo":
                List<Date> respuestaFechas = dbService.consultarRevisionPorArticulo(articulo);
                return new ResponseEntity<>(respuestaFechas, HttpStatus.OK);
            case "ultima":
                List<Date> respuestaUltimaFecha = List.of(dbService.consultarUltimaRevisionPorArticulo(articulo));
                return new ResponseEntity<>(respuestaUltimaFecha, HttpStatus.OK);
        }
        return null; //TODO CAMBIAR
    }

    //TODO: Mirar lo de ResponseEntity<List<Revision>> (Quizás no haga falta devolver listas siempre).
    @PostMapping("insertar")
    public ResponseEntity<List<Revision>> insertar(@RequestBody Articulo articulo, Date fecha) {
        // Se extrae el id del Articulo que llega.
        Long idArticulo = articulo.getId();

        // Se crea una nueva Revision y se le setean los campos.
        Revision nuevarevision = new Revision();
        nuevarevision.setArticulo(articulo);
        nuevarevision.setFecha_revision(fecha);

        List<Revision> respuestaRevision = List.of(dbService.insertarRevision(nuevarevision));
        return new ResponseEntity<>(respuestaRevision, HttpStatus.CREATED);
    }

    @PutMapping("actualizar")
    public ResponseEntity<Revision> actualizar(@RequestBody Revision revision) {
        Revision respuesta = dbService.actualizarRevision(revision);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
