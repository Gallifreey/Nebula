package com.nebula.nebulaprovider.mapper;
import com.nebula.nebulaprovider.entity.dataset.DataSet;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DataSetMapper {
    @Select("SELECT * FROM dataset WHERE spid=#{spid}")
    List<DataSet> getDatasetBySPID(Integer spid);
}
