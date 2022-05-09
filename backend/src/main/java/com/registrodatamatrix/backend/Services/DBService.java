package com.registrodatamatrix.backend.Services;

import org.springframework.boot.autoconfigure.cassandra.CassandraProperties;
import org.springframework.stereotype.Service;

@Service
public class DBService {

    protected CassandraProperties.Connection conexion;

    public DBService() {

    }
}
