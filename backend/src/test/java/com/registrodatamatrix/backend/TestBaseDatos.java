package com.registrodatamatrix.backend;

import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import com.registrodatamatrix.backend.DataMatrix.*;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestBaseDatos {

    @Test
    public void test() throws IOException, SQLException {
        //TEST DATAMATRIX
//        DataMatrix dataMatrix = new DataMatrix();
//        dataMatrix.generarDataMatrixImagen(1);



        // TEST SQL
        GestorDatos gestorDatos = new GestorDatos();

        List<String> valoresPrueba = Arrays.asList("'NombreTest'", "'ModeloTest'");
        Date date = new Date(26, 04, 2022);

        gestorDatos.insertarArticulo(valoresPrueba);
//        gestorDatos.insertarRevision(date);
    }
}
