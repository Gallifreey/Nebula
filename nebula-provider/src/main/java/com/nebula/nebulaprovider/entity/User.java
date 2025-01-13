package com.nebula.nebulaprovider.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private String username;

    private String password;

    private String nickname;

    private String avatar;

    private Byte[] roles;
}
