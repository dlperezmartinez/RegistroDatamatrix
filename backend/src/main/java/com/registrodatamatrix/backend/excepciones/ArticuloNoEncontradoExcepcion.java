package com.registrodatamatrix.backend.excepciones;

public class ArticuloNoEncontradoExcepcion extends RuntimeException{
    public ArticuloNoEncontradoExcepcion(String mensaje) {
        super(mensaje);
    }
}
