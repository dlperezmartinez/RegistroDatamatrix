package com.registrodatamatrix.backend.DB.Tablas;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "revision")
public class Revision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull //TODO: Comprobar que esto está bien hecho y hacerlo en el resto de sitios que haga falta.
    @ManyToOne
    @JoinColumn(name="id_articulo")
    private Articulo articulo;

    private Date fecha_revision;

    public Revision(Articulo id_articulo, Date fecha_revision) {
        this.articulo = id_articulo;
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

    public Articulo getArticulo() {
        return articulo;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public Date getFecha_revision() {
        return fecha_revision;
    }

    public void setFecha_revision(Date fecha_revision) {
        this.fecha_revision = fecha_revision;
    }
}
