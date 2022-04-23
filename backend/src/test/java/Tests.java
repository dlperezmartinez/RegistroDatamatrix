import DataMatrix.DataMatrix;

import java.io.IOException;

public class Tests {
    public static void main(String[] args) throws IOException {
        DataMatrix dataMatrix = new DataMatrix();
        dataMatrix.generarDataMatrixImagen(1);
    }
}
