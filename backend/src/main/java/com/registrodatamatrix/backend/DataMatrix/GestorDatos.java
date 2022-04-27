package com.registrodatamatrix.backend.DataMatrix;

import java.sql.*;
import java.util.Arrays;
import java.util.List;

public class GestorDatos {
    final String serverURL = "jdbc:sqlserver://localhost:1433";
    final String nameDB = "REGISTRO_DATAMATRIX";
    final String user = "adminRegistroDM";
    final String pass = "1234";

    String connectionUrl =
            serverURL + ";"
            + "database=" + nameDB + ";"
            + "user=" + user + ";"
            + "password=" + pass + ";"
            + "encrypt=false;"
            + "trustServerCertificate=false;"
            + "loginTimeout=30;";

    // Método que establece la conexxión con la base de datos.
    protected Statement establecerConexion() throws SQLException {
        Connection connection = DriverManager.getConnection(connectionUrl);

        return connection.createStatement();
    }

    // Método general para los insertar filas.
    protected void insertar(String nombreTabla, List<String> nombreColumnas, List<String> valores) throws SQLException {
        String instruccion = "INSERT";

        // Se establece la conexión con la base de datos.
        Statement statement = establecerConexion();

        // Ejecución de la sentencia
        instruccionSQL(instruccion, nombreTabla, nombreColumnas, valores);
    }
    protected void insertar(String nombreTabla, String nombreColumna, String valor) throws SQLException {
        insertar(nombreTabla, List.of(nombreColumna), List.of(valor));
    }

    protected Object consultar(String nombreTabla, String nombreColumna) throws SQLException {
        String instruccion = "SELECT";

        return instruccionSQL(instruccion, nombreTabla, List.of(nombreColumna));
    }

    /**
     * Método publico que inserta valores en la tabla articulo.
     * @param valores List<String>
     * @throws SQLException
     */
    public void insertarArticulo(List<String> valores) throws SQLException {
        String nombreTabla = "articulo";
        List<String> nombreColumnas = Arrays.asList("nombre", "modelo");

        insertar(nombreTabla, nombreColumnas, valores);
    }

    public void insertarRevision(Date valor, int id_articulo) throws SQLException {
        String nombreTabla = "revision";
        String nombreColumna = "fecha_revision";

        insertar(nombreTabla, nombreColumna, "convert(datetime,'" + valor.toString() + "')");
    }

    public Object instruccionSQL(String instruccion, String nombreTabla, List<String> nombreColumnas, List<String> valores, String condicion) throws SQLException {
        String query = "";
        // Se establece la conexión con la base de datos.
        Statement statement = establecerConexion();

        switch (instruccion) {
            case "SELECT":
                query = "SELECT " + nombreColumnas + " FROM " + nombreTabla;
            case "INSERT":
                query = "INSERT INTO " + nombreTabla + " (" + String.join(",", nombreColumnas) + ") VALUES (" + String.join(",", valores) + ")";
            case "DELETE":
                query = "DELETE FROM " + nombreTabla + " WHERE " + nombreColumnas + " LIKE " + "'" + condicion + "'";
        }

        // Ejecución de la sentencia
        return statement.execute(query);
    }
    public Object instruccionSQL(String instruccion, String nombreTabla, List<String> nombreColumnas, List<String> valores) throws SQLException {
        return instruccionSQL(instruccion, nombreTabla, nombreColumnas, valores, null);
    }
    public Object instruccionSQL(String instruccion, String nombreTabla, List<String> nombreColumnas) throws SQLException {
        return instruccionSQL(instruccion, nombreTabla, nombreColumnas, null, null);
    }
}