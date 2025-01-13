package com.nebula.nebulaprovider.service;

import com.nebula.nebulaprovider.entity.common.Route;
import com.nebula.nebulaprovider.mapper.CommonMapper;
import com.nebula.nebulaprovider.service.impl.CommonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonService implements CommonServiceImpl {
    @Autowired
    CommonMapper commonMapper;

    @Override
    public List<Route> getSystemRoutes() {
        return commonMapper.getSystemRoutes();
    }
}
