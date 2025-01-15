package com.nebula.nebulaprovider.entity.dataset;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class Box2DLabel implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private Integer x;

    private Integer y;

    private Integer width;

    private Integer height;
}
