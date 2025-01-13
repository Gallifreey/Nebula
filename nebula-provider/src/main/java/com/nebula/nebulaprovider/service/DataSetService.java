package com.nebula.nebulaprovider.service;

import com.nebula.nebulaprovider.entity.dataset.DataSet;
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
}
