package com.registrodatamatrix.backend.basedatos.Repositorios;

import com.registrodatamatrix.backend.basedatos.Tablas.Articulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long> {
    Optional<Articulo> findArticuloById(Long id);
}
