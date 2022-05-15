package com.registrodatamatrix.backend.datamatrix;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.datamatrix.DataMatrixWriter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;

//TODO: Mirar como hacer bien lo del output.
//TODO: Quizás estaría bien que se le pudiera pasar una ruta de output.
public class DataMatrix {

    // Output de la imagen.
    String outputPath = "D:\\Documentos\\_ProyectoDAM\\RegistroDatamatrix\\backend\\src\\test\\java\\com\\registrodatamatrix\\backend\\imageOutput\\";

    // Dimensiones de la imagen.
    int ancho = 144;
    int alto  = 144;

    public void generarDataMatrixImagen(String nombre, Long id) throws IOException {
        DataMatrixWriter dataMatrixWriter = new DataMatrixWriter();

        BitMatrix bitMatrix = dataMatrixWriter.encode(String.valueOf(id), BarcodeFormat.DATA_MATRIX, ancho, alto);

        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        File file = new File(outputPath + nombre + "_" + id + ".jpg");
        ImageIO.write(bufferedImage, "jpg", file);
    }

    public void consultarArticuloConDataMatrix(ImageIO imagen) {
//        ImageIO.read
    }

    public void imprimirDataMatrix() {
//        PrintStream
    }
}
