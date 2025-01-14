package com.nebula.nebulaprovider.entity.dataset.Form;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class LabelDataShort implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private String name;

    private String color;
}
