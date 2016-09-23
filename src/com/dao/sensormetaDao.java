package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.maxmin;
import com.db.DBUtil;
import com.model.sensordata;
import com.model.sensormeta;

public class sensormetaDao {
	/**
	 * ���ݽڵ�Ų�ѯ�ڵ�����Ĵ�������Ϣ �¶ȡ����յ� 
	 * @param node_id
	 * @return
	 * @throws Exception
	 */
	public List<sensormeta> queryByNodeId(Integer node_id) throws Exception{
		
		List<sensormeta> result = new ArrayList<sensormeta>();
		String sql = "select * from sensormeta where node_id="+node_id;		
		Connection conn = DBUtil.getConnection();
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(sql);
		sensormeta m = null;
		while(rs.next()){
			m = new sensormeta();
			m.setId(rs.getInt("id"));
			m.setSensor_id(rs.getInt("sensor_id"));
			m.setSensor_type(rs.getString("sensor_type"));
			m.setNode_id((rs.getInt("node_id")));
			m.setDescription(rs.getString("description"));
			m.setLocation(rs.getString("location"));
			m.setMax_alert(rs.getInt("max_alert"));
			m.setMin_alert(rs.getInt("min_alert"));
			m.setSwitch_state(rs.getString("switch_state"));
			m.setStatus(rs.getString("status"));
			
			result.add(m);
			
		}		
		return result;
	}
	/**
	 * ���ݽڵ�źʹ��������Ͳ�ѯ ����ֵ���ֵ
	 * @param sensor_type
	 * @param node_id
	 * @return
	 * @throws Exception
	 */
	public int getMaxalertByTypeNodeId(String sensor_type,Integer node_id) throws Exception{
		int max_alert=-1;
		List<sensormeta> metas = queryByNodeId(node_id);
		
		for (sensormeta sensormeta : metas) {
			if(sensormeta.getSensor_type().equals(sensor_type)){
				max_alert = sensormeta.getMax_alert();
				break;
			}
		}
		
		return max_alert;
		
	}
	/**
	 * ���ݽڵ�źʹ��������Ͳ�ѯ ����ֵ���ֵ
	 * @param sensor_type
	 * @param node_id
	 * @return
	 * @throws Exception
	 */
	public int getMinalertByTypeNodeId(String sensor_type,Integer node_id) throws Exception{
		int min_alert=-1;
		List<sensormeta> metas = queryByNodeId(node_id);
		for (sensormeta sensormeta : metas) {
			if(sensormeta.getSensor_type().equals(sensor_type)){
				min_alert = sensormeta.getMin_alert();
				break;
			}
		}
		return min_alert;		
	}
	
}
