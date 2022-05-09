package com.registrodatamatrix.backend.DB.Tablas;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "revision")
public class Revision {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer id_articulo;
    private Date fecha_revision;

    public Revision(Integer id_articulo, Date fecha_revision) {
        this.id_articulo = id_articulo;
        this.fecha_revision = fecha_revision;
    }

    public Revision() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId_articulo() {
        return id_articulo;
    }

    public void setId_articulo(Integer id_articulo) {
        this.id_articulo = id_articulo;
    }

    public Date getFecha_revision() {
        return fecha_revision;
    }

    public void setFecha_revision(Date fecha_revision) {
        this.fecha_revision = fecha_revision;
    }
}
