package com.registrodatamatrix.backend.basedatos.Repositorios;

import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface RevisionRepository extends JpaRepository<Revision, Long> {
    @Query("SELECT r.fecha_revision FROM Revision r WHERE r.articulo.id = ?1")
    Optional<List<Date>> findRevisionesByArticulo(Long idArticulo);

    @Query("SELECT max(r.fecha_revision) FROM Revision r WHERE r.articulo.id = ?1")
    Date findLastRevisionByArticulo(Long idArticulo);
}
