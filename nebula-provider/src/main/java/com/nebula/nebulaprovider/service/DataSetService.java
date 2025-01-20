package com.nebula.nebulaprovider.service;

import com.nebula.nebulaprovider.entity.dataset.Data;
import com.nebula.nebulaprovider.entity.dataset.DataSet;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShort;
import com.nebula.nebulaprovider.entity.dataset.Form.LabelDataShort;
import com.nebula.nebulaprovider.entity.dataset.Label;
import com.nebula.nebulaprovider.mapper.DataSetMapper;
import com.nebula.nebulaprovider.service.impl.DataSetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataSetService implements DataSetServiceImpl {
    @Autowired
    DataSetMapper dataSetMapper;

    @Override
    public List<DataSet> getDatasetBySPID(Integer spid) {
        return dataSetMapper.getDatasetBySPID(spid);
    }

    @Override
    public Integer addNewDataset(DataSet dataSet) {
        return dataSetMapper.addNewDataset(dataSet);
    }

    @Override
    public List<Label> getLabelsByDSID(Integer id) {
        return dataSetMapper.getLabelsByDSID(id);
    }

    @Override
    public Integer addNewLabel(Label label) {
        return dataSetMapper.addNewLabel(label);
    }

    @Override
    public String getDatasetNameByDSID(Integer id) {
        return dataSetMapper.getDatasetNameByDSID(id);
    }

    @Override
    public void addDataFromBatch(List<Data> dataList) {
        for (Data data: dataList) {
            dataSetMapper.addNewData(data);
        }
    }

    @Override
    public List<ImageDataShort> getPreviewDataByDSID(Integer id, Integer preview, Integer offset) {
        return dataSetMapper.getPreviewDataByDSID(id, preview, offset);
    }

    @Override
    public Integer getSingleValue(Integer id, String key) {
        return dataSetMapper.getSingleValue(id, key);
    }

    @Override
    public List<Integer> getLabelIDSets(Integer id, String query) {
        return dataSetMapper.getLabelIDSets(id, query);
    }

    @Override
    public List<LabelDataShort> getLabels(Integer id, String query) {
        return dataSetMapper.getLabels(id, query);
    }

    @Override
    public Object getImagePropertyByPID(Integer id, String key) {
        return dataSetMapper.getImagePropertyByPID(id, key);
    }

    @Override
    public Object getLabelPropertyByID(Integer id, String key) {
        return dataSetMapper.getLabelPropertyByID(id, key);
    }
}
