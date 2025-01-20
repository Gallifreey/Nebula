package com.nebula.nebulaprovider.entity.dataset;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class ClassificationAnnotation implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
}
