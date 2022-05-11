package com.registrodatamatrix.backend.basedatos.Repositorios;

import com.registrodatamatrix.backend.basedatos.Tablas.Revision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RevisionRepository extends JpaRepository<Revision, Long> {
    Optional<Revision> findRevisionesById(Long id);
}
