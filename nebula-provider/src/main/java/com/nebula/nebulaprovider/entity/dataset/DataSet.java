package com.nebula.nebulaprovider.entity.dataset;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = false)
public class DataSet implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    private String version;

    private Integer oid;

    private Integer capacity;

    private Integer importStatus;

    private Integer labelingStatus;

    private String name;

    private Integer totalLabels;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;

    private Double size;

    private Integer labeled;

    private String bucketPath;

    private Integer spid;

    private Integer type;
}

