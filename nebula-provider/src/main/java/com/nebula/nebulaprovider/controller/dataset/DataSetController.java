package com.nebula.nebulaprovider.controller.dataset;

import com.alibaba.fastjson.JSONObject;
import com.nebula.nebulaprovider.entity.Result;
import com.nebula.nebulaprovider.entity.dataset.Data;
import com.nebula.nebulaprovider.entity.dataset.DataSet;
import com.nebula.nebulaprovider.entity.dataset.DataSetForm;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShort;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShortDetails;
import com.nebula.nebulaprovider.entity.dataset.Label;
import com.nebula.nebulaprovider.service.DataSetService;
import com.nebula.nebulaprovider.utils.JSONUtils;
import com.nebula.nebulaprovider.utils.Minio;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class DataSetController {
    @Autowired
    private DataSetService dataSetService;

    @Autowired
    private MinioClient minioClient;

    @GetMapping("/api/data_manage/dataset")
    public Result getDatasetBySPID(Integer id){
        String[] keys = new String[]{
                "bucketPath",
        };
        return Result.success("获取成功", JSONUtils.removeKeysFromObject(dataSetService.getDatasetBySPID(id), keys));
    }

    @PostMapping("/api/data_manage/dataset")
    public Result addNewDataset(String dataset, @RequestParam("files") MultipartFile[] file) throws IOException {
        DataSet dataSet = JSONObject.parseObject(dataset, DataSet.class);
        LocalDateTime time = LocalDateTime.now();
        dataSet.setCreateTime(time);
        MultipartFile test = file[0];
        List<String> strings = Minio.unzipInputStream(minioClient, test.getInputStream(), dataSet);
        Integer code = dataSetService.addNewDataset(dataSet);
        if(code == 0) return Result.error("添加失败");
        List<Data> dataList = new ArrayList<>();
        for (String str: strings) {
            Data data = new Data();
            data.setDsid(dataSet.getId());
            data.setName(str);
            dataList.add(data);
        }
        dataSetService.addDataFromBatch(dataList);
        return Result.success("添加成功");
    }

    @GetMapping("/api/data_manage/images")
    public Result getDatasetDetails(Integer id, Integer preview, Integer offset) throws Exception {
        List<ImageDataShort> images = dataSetService.getPreviewDataByDSID(id, preview, offset);
        Minio.getFilesFromPathList(minioClient, images);
        ImageDataShortDetails details = new ImageDataShortDetails();
        details.setImages(images);
        details.setCapacity(dataSetService.getSingleValue(id, "capacity"));
        return Result.success(details);
    }

    @GetMapping("/api/data_manage/labels")
    public Result getLabels(Integer id){
        return Result.success(dataSetService.getLabelsByDSID(id));
    }

    @PostMapping("/api/data_manage/labels")
    public Result addLabel(String name, String color, Integer id){
        Label label = new Label();
        label.setName(name);
        label.setColor(color);
        label.setDsid(id);
        Integer code = dataSetService.addNewLabel(label);
        if(code == 0) return Result.error("添加失败");
        return Result.success("添加成功");
    }


    @GetMapping("/api/data_manage/source_image")
    public Result getSourceImage(Integer pid) {
        return Result.success();
    }
}
