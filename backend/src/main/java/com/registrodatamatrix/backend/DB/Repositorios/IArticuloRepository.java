package com.registrodatamatrix.backend.DB.Repositorios;

import com.registrodatamatrix.backend.DB.Tablas.Articulo;
import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IArticuloRepository extends JpaRepository<Articulo, String> {
    List<Articulo> findByArticulo(String nombre);
}
