package DataMatrix;

import java.sql.*;
import java.util.Arrays;
import java.util.Collections;
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
        // Se establece la conexión con la base de datos.
        Statement statement = establecerConexion();

        // Se construye la query: Las List<String> que llegan que "splitean" por comas en una String.
        String query = "INSERT INTO " + nombreTabla + " (" + String.join(",", nombreColumnas) + ") VALUES (" + String.join(",", valores) + ")";

        // Ejecución de la sentencia
        statement.execute(query);
    }
    protected void insertar(String nombreTabla, String nombreColumna, String valor) throws SQLException {
        insertar(nombreTabla, List.of(nombreColumna), List.of(valor));
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

        insertar(nombreTabla, nombreColumna, "convert(datetime,'18-06-12 10:34:09 PM',5)");
    }

    public void consultar(String condicionante) throws SQLException {
        // Se establece la conexión con la base de datos.
        Statement statement = establecerConexion();

        // Se construye la query: Las List<String> que llegan que "splitean" por comas en una String.
        String query = "SELECT INTO " + nombreTabla + " (" + String.join(",", nombreColumnas) + ") VALUES (" + String.join(",", valores) + ")";

        // Ejecución de la sentencia
        statement.execute(query);
    }

    protected void ejecutarQuery() {
        
    }
}