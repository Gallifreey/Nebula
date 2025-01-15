package com.nebula.nebulaprovider.service;

import com.nebula.nebulaprovider.mapper.LabelingMapper;
import com.nebula.nebulaprovider.service.impl.LabelingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LabelingService implements LabelingServiceImpl {
    @Autowired
    LabelingMapper labelingMapper;
}
