package com.registrodatamatrix.backend.services;

import com.registrodatamatrix.backend.basedatos.Repositorios.ArticuloRepository;
import com.registrodatamatrix.backend.basedatos.Repositorios.RevisionRepository;
import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import com.registrodatamatrix.backend.excepciones.ArticuloNoEncontradoExcepcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class DBService {

    protected CassandraProperties.Connection conexion;

    private final ArticuloRepository articuloRepository;
    private final RevisionRepository revisionRepository;

    @Autowired
    public DBService(ArticuloRepository articuloRepository, RevisionRepository revisionRepository) {
        this.articuloRepository = articuloRepository;
        this.revisionRepository = revisionRepository;
    }

    // ARTICULO
    public List<Articulo> consultarArticulos() {
        return articuloRepository.findAll();
    }

    public Articulo consultarArticuloPorId(Long id) {
        return articuloRepository.findArticuloById(id).orElseThrow(() -> new ArticuloNoEncontradoExcepcion("Articulo no encontrado"));
    }

    public Articulo insertarArticulo(Articulo articulo) {
        return articuloRepository.save(articulo);
    }

    public Articulo actualizarArticulo(Articulo articulo) {
        return articuloRepository.save(articulo);
    }

    public void eliminarArticulo(Long id) {
        articuloRepository.deleteById(id);
    }

    // REVISIONES
    public List<Date> consultarRevisionPorArticulo(Articulo articulo) {
        Long idArticulo = articulo.getId(); //TODO: Preguntar si esto es correcto.
        return revisionRepository.findRevisionesByArticulo(idArticulo).orElseThrow(() -> new ArticuloNoEncontradoExcepcion("No hay revisiones"));
    }

    public List<Date> consultarUltimaRevisionPorArticulo(List<Articulo> articulos) {
        List<Date> resultadoFechas = new ArrayList<>();
        for (Articulo articulo : articulos) {

            Long idArticulo = articulo.getId(); //TODO: Preguntar si esto es correcto.
            resultadoFechas.add(revisionRepository.findLastRevisionByArticulo(idArticulo));
        }
        return resultadoFechas;
    }

    public Revision insertarRevision(Revision revision) {
        return revisionRepository.save(revision);
    }

    public Revision actualizarRevision(Revision revision) {
        return revisionRepository.save(revision);
    }

}
