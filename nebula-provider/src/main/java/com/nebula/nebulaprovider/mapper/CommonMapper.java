package com.nebula.nebulaprovider.mapper;

import com.nebula.nebulaprovider.entity.common.Route;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommonMapper {
    @Select("SELECT * FROM route")
    List<Route> getSystemRoutes();
}
