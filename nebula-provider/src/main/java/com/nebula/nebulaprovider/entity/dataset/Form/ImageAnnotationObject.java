package com.nebula.nebulaprovider.entity.dataset.Form;

import com.nebula.nebulaprovider.entity.dataset.Image;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class ImageAnnotationObject<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private Image image;

    private List<T> annotations;

}
