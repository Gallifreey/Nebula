package com.nebula.nebulaprovider.entity.dataset.Form;

import com.nebula.nebulaprovider.entity.dataset.Image;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class LabelingPlaygroundData implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<Image> images;

    private List<Object> labels;
}
