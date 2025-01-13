package com.nebula.nebulaprovider.entity.dataset;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class DataSetForm implements Serializable {
    private static final long serialVersionUID = 1L;

    private DataSet dataset;

    private MultipartFile file;
}
