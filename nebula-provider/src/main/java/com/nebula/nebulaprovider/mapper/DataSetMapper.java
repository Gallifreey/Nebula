package com.nebula.nebulaprovider.mapper;
import com.nebula.nebulaprovider.entity.dataset.Data;
import com.nebula.nebulaprovider.entity.dataset.DataSet;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShort;
import com.nebula.nebulaprovider.entity.dataset.Label;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DataSetMapper {
    @Select("SELECT * FROM dataset WHERE spid=#{spid}")
    List<DataSet> getDatasetBySPID(Integer spid);

    @Insert("INSERT INTO dataset(version, capacity, oid, import_status, labeling_status, name, create_time, total_labels, size, labeled, spid, type) VALUE(" +
            "#{version}, #{capacity}, #{oid}, #{importStatus}, #{labelingStatus}, #{name}, #{createTime}, #{totalLabels}, #{size}, #{labeled}, #{spid}, #{type})")
    @Options(useGeneratedKeys = true,keyProperty = "id",keyColumn = "id")
    Integer addNewDataset(DataSet dataSet);

    @Select("SELECT * FROM label WHERE dsid=#{id}")
    List<Label> getLabelsByDSID(Integer id);

    @Insert("INSERT INTO label(name, color, dsid) VALUE(#{name}, #{color}, #{dsid})")
    Integer addNewLabel(Label label);

    @Select("SELECT name FROM dataset WHERE id=#{id}")
    String getDatasetNameByDSID(Integer id);

    @Insert("INSERT INTO data(name, dsid) VALUE(#{name}, #{dsid})")
    Integer addNewData(Data data);

    @Select("SELECT data.id AS id, data.name AS name, CONCAT(dataset.name,\"/images/\",data.name) AS path FROM data, dataset WHERE dsid=#{id} LIMIT #{preview} offset #{offset}")
    List<ImageDataShort> getPreviewDataByDSID(Integer id, Integer preview, Integer offset);

    @Select("SELECT ${key} FROM dataset WHERE id=#{id}")
    Integer getSingleValue(Integer id, String key);

    @Select("SELECT ${key} FROM ${base} WHERE id=#{id}")
    Integer getSingleValueDup(Integer id, String key, String base);

    @Select("SELECT id FROM label WHERE dsid=#{id} AND name IN ${query}")
    List<Integer> getLabelIDSets(Integer id, String query);
}
