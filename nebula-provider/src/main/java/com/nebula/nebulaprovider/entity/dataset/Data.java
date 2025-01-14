package com.nebula.nebulaprovider.entity.dataset;

import lombok.EqualsAndHashCode;

import java.io.Serializable;

@lombok.Data
@EqualsAndHashCode(callSuper = false)
public class Data implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private String name;

    private Integer dsid;
}
