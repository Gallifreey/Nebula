package com.nebula.nebulaprovider.controller.dataset;

import com.alibaba.fastjson.JSONObject;
import com.nebula.nebulaprovider.entity.Result;
import com.nebula.nebulaprovider.entity.dataset.DataSet;
import com.nebula.nebulaprovider.entity.dataset.DataSetForm;
import com.nebula.nebulaprovider.service.DataSetService;
import com.nebula.nebulaprovider.utils.JSONUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;

@RestController
public class DataSetController {
    @Autowired
    private DataSetService dataSetService;

    @GetMapping("/api/data_manage/dataset")
    public Result getDatasetBySPID(Integer id){
        String[] keys = new String[]{
                "bucketPath",
        };
        return Result.success("获取成功", JSONUtils.removeKeysFromObject(dataSetService.getDatasetBySPID(id), keys));
    }

    @PostMapping("/api/data_manage/dataset")
    public Result addNewDataset(String dataset, @RequestParam("files") MultipartFile[] file){
        System.out.println(file);
        DataSet dataSet = JSONObject.parseObject(dataset, DataSet.class);
        System.out.println(dataSet);
        LocalDateTime time = LocalDateTime.now();
        dataSet.setCreateTime(time);
        return Result.success("添加成功");
    }
}
