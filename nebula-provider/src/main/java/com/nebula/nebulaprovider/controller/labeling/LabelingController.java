package com.nebula.nebulaprovider.controller.labeling;

import com.nebula.nebulaprovider.entity.Result;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShort;
import com.nebula.nebulaprovider.entity.dataset.Image;
import com.nebula.nebulaprovider.service.DataSetService;
import com.nebula.nebulaprovider.service.LabelingService;
import com.nebula.nebulaprovider.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nebula.nebulaprovider.utils.Constant.DATASET_TYPE;

import java.util.List;

import static com.nebula.nebulaprovider.utils.Constant.DATASET_TYPE.BOX_2D;
import static com.nebula.nebulaprovider.utils.Constant.DATASET_TYPE.CLASSIFICATION;

@RestController
public class LabelingController {

    private static final Integer preview = 10;

    @Autowired
    private LabelingService labelingService;

    @Autowired
    private DataSetService dataSetService;

    @GetMapping("/api/labelng/playground")
    public Result getLabelingPGData(Integer id, Integer offset){
        DATASET_TYPE type = DATASET_TYPE.valueOf(dataSetService.getSingleValue(id, "type"));
        List<ImageDataShort> images = dataSetService.getPreviewDataByDSID(id, preview, offset);
        switch (type) {
            case CLASSIFICATION:

                break;
            case BOX_2D:

                break;
                default:
                    return Result.error("");
        }
        return Result.success();
    }
}
