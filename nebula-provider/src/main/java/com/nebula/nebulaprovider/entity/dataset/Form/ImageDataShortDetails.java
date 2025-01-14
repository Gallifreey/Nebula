package com.nebula.nebulaprovider.entity.dataset.Form;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class ImageDataShortDetails implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<ImageDataShort> images;

    private List<LabelDataShort> labels;

}
