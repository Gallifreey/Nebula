package com.nebula.nebulaprovider.service.impl;

import com.nebula.nebulaprovider.entity.dataset.DataSet;

import java.util.List;

public interface DataSetServiceImpl {
    List<DataSet> getDatasetBySPID(Integer spid);
}
