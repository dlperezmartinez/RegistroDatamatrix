package com.registrodatamatrix.backend.Controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.registrodatamatrix.backend.Services.DBService;

@RestController
@RequestMapping("/api/")
public class Controlador {

    @Autowired
    DBService dbService;

    @GetMapping("consultar")
    public ResponseEntity<?> consultar() {
        return Response;
    }


}