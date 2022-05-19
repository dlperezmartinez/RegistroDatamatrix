package com.registrodatamatrix.backend.controlador;

import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import com.registrodatamatrix.backend.datamatrix.DataMatrix;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.registrodatamatrix.backend.services.DBService;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/articulos/")
@CrossOrigin
public class ControladorArticulos {

    private final DBService dbService;
    private DataMatrix dataMatrix = new DataMatrix();

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
    public ResponseEntity<Articulo> insertar(@RequestBody Articulo articulo) throws IOException {

        // Se hace la petición al servicio.
        Articulo respuestaArticulo = dbService.insertarArticulo(articulo);

        // Una vez hecho el insert se llama al método encargado de crear la imagen DataMatrix.
        dataMatrix.generarDataMatrixImagen(respuestaArticulo.getNombre(), respuestaArticulo.getId());

        // Se envía la respuesta.
        return new ResponseEntity<>(respuestaArticulo, HttpStatus.CREATED);
    }

    @PutMapping("actualizar")
    public ResponseEntity<Articulo> actualizar(@RequestBody Articulo articulo) {
        Articulo respuesta = dbService.actualizarArticulo(articulo);
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("eliminar")
    public ResponseEntity<Articulo> eliminar(@RequestBody Articulo articulo) {
        var articuloBorrado = articulo;
        // Se hace la petición al servicio.
        dbService.eliminarArticulo(articulo);

        // Se envía la respuesta.
        return new ResponseEntity<>(articuloBorrado, HttpStatus.OK);
    }

    @GetMapping("datamatrix")
    public ResponseEntity<byte[]> generarDataMatrix(Long id) throws IOException {

        byte[] dataMatrixEnBytes = dataMatrix.generarDataMatrixImagen(id.toString(), id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(dataMatrixEnBytes, headers, HttpStatus.OK);
    }
}