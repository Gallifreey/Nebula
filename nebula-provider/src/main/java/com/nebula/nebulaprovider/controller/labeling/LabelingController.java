package com.nebula.nebulaprovider.controller.labeling;

import com.nebula.nebulaprovider.entity.Result;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShort;
import com.nebula.nebulaprovider.entity.dataset.Form.LabelingPlaygroundData;
import com.nebula.nebulaprovider.service.DataSetService;
import com.nebula.nebulaprovider.service.LabelingService;
import com.nebula.nebulaprovider.utils.Constant.DATASET_TYPE;
import com.nebula.nebulaprovider.utils.LabelUtils;
import com.nebula.nebulaprovider.utils.Minio;
import com.nebula.nebulaprovider.utils.Utils;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static com.nebula.nebulaprovider.utils.Constant.CLASSES_FILE_NAME;

@RestController
public class LabelingController {

    private static final Integer preview = 10;

    @Autowired
    private LabelingService labelingService;

    @Autowired
    private DataSetService dataSetService;

    @Autowired
    private MinioClient minioClient;

    @GetMapping("/api/labeling/playground")
    public Result getLabelingPGData(Integer id, Integer offset) throws Exception {
        String name = dataSetService.getDatasetNameByDSID(id);
        DATASET_TYPE type = DATASET_TYPE.valueOf(dataSetService.getSingleValue(id, "type"));
        List<ImageDataShort> images = dataSetService.getPreviewDataByDSID(id, preview, offset);
        Minio.getFilesFromPathList(minioClient, images);
        List<Object> labels = new ArrayList<>();
        LabelingPlaygroundData data = new LabelingPlaygroundData();
        switch (type) {
            case CLASSIFICATION:
                for (ImageDataShort image: images) {
                    labels.add(LabelUtils.getClassifications(dataSetService, id, minioClient, LabelUtils.getLabelPath(image.getName(), name)));
                }
                break;
            case BOX_2D:
                for (ImageDataShort image: images) {
                    labels.add(LabelUtils.getBox2D(dataSetService, id, minioClient, LabelUtils.getLabelPath(image.getName(), name)));
                }
                break;
                default:
                    return Result.error("");
        }
        data.setImages(images);
        data.setLabels(labels);
        data.setCapacity(dataSetService.getSingleValue(id, "capacity"));
        return Result.success(data);
    }

    @GetMapping("/api/labeling/labels")
    public Result getLabelingPGData(Integer id) throws Exception {
        String name = dataSetService.getDatasetNameByDSID(id);
        String path = name + "/" + CLASSES_FILE_NAME;
        String content = Minio.getFileContentFromPath(minioClient, path);
        List<String> strings = List.of(content.split("\n"));
        return Result.success(dataSetService.getLabels(id, Utils.generateQuery(strings)));
    }
}
