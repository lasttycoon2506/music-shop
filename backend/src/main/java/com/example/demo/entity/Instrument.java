package main.java.com.example.demo.entity;

import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "instrument")
@Data
public class Instrument {

    @Id
    @GeneratedValue(strategy = GenerationType.Identity)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private BigDecimal price;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "stock")
    private int stock;

}
