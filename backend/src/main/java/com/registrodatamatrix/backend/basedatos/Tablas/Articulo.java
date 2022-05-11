package com.registrodatamatrix.backend.basedatos.Tablas;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "articulo")
public class Articulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String nombre;
    private String modelo;

    public Articulo(String nombre, String modelo) {
        this.nombre = nombre;
        this.modelo = modelo;
    }

    public Articulo() {

    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getModelo() {
        return modelo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }
}
