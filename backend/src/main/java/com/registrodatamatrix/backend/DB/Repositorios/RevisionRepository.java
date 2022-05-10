package com.registrodatamatrix.backend.DB.Repositorios;

import com.registrodatamatrix.backend.DB.Tablas.Articulo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevisionRepository extends CrudRepository<Articulo, String> {
}
