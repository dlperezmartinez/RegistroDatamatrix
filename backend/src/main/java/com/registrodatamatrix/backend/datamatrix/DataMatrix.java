package com.registrodatamatrix.backend.datamatrix;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.datamatrix.DataMatrixWriter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class DataMatrix {

    // Dimensiones de la imagen.
    int ancho = 20;
    int alto  = 20;

    public void generarDataMatrixImagen(int id) throws IOException {
        DataMatrixWriter dataMatrixWriter = new DataMatrixWriter();

        BitMatrix bitMatrix = dataMatrixWriter.encode(String.valueOf(id), BarcodeFormat.DATA_MATRIX, ancho, alto); //TODO cambiar hardcodes

        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        File file = new File("D:\\Documentos\\_ProyectoDAM\\RegistroDatamatrix\\backend\\src\\test\\java\\imageOutput\\image.jpg"); //TODO cambiar.
        ImageIO.write(bufferedImage, "jpg", file);
    }
}
