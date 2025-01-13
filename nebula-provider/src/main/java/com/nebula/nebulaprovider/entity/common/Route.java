package com.nebula.nebulaprovider.entity.common;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class Route implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private Integer parentId;

    private String title;

    private String icon;

    private String component;

    private String redirect;

    private String path;

    private String name;

    private String locale;

    private Boolean keepAlive;

    private Boolean hideInMenu;
}
