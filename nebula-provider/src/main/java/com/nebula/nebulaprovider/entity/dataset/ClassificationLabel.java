package com.nebula.nebulaprovider.entity.dataset;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class ClassificationLabel implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
}
