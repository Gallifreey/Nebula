package com.nebula.nebulaprovider.entity.dataset;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class Image implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private String name;

    private String string;

    private String type;

}
