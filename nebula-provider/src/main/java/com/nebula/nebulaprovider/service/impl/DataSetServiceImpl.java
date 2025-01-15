package com.nebula.nebulaprovider.service.impl;

import com.nebula.nebulaprovider.entity.dataset.Data;
import com.nebula.nebulaprovider.entity.dataset.DataSet;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShort;
import com.nebula.nebulaprovider.entity.dataset.Label;

import java.util.List;

public interface DataSetServiceImpl {
    List<DataSet> getDatasetBySPID(Integer spid);

    Integer addNewDataset(DataSet dataSet);

    List<Label> getLabelsByDSID(Integer id);

    Integer addNewLabel(Label label);

    String getDatasetNameByDSID(Integer id);

    void addDataFromBatch(List<Data> dataList);

    List<ImageDataShort> getPreviewDataByDSID(Integer id, Integer preview, Integer offset);

    Integer getSingleValue(Integer id, String key);

    List<Integer> getLabelIDSets(Integer id, String query);
}
