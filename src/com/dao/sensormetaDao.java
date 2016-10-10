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
	 * 根据节点号查询节点包含的传感器信息 温度、光照等 
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
		String type = null;
		while(rs.next()){
			m = new sensormeta();
			m.setId(rs.getInt("id"));
			m.setSensor_id(rs.getInt("sensor_id"));
			type = rs.getString("sensor_type");
			if(type=="光照传感器"||type.equals("光照传感器")){
				type+="(Lx)";
			}else if(type =="温度传感器"||type.equals("温度传感器")){
				type+="(°C)";
			}else if(type=="湿度传感器"||type.equals("湿度传感器")){
				type+="(g/m3)";
			}else if(type=="土壤温度传感器"||type.equals("土壤温度传感器")){
				type+="(°C)";
			}else if(type=="土壤湿度传感器"||type.equals("土壤湿度传感器")){
				type+="(g/m3)";
			}
			System.out.println(type);
			m.setSensor_type(type);
			m.setNode_id((rs.getInt("node_id")));
			m.setDescription(rs.getString("description"));
			m.setLocation(rs.getString("location"));
			m.setMax_alert(rs.getInt("max_alert"));
			m.setMin_alert(rs.getInt("min_alert"));
			m.setSwitch_state(rs.getString("switch_state"));
			m.setStatus(rs.getString("status"));
			
			result.add(m);
			
		}
		rs.close();
		stmt.close();
		return result;
	}
	/**
	 * 根据节点号和传感器类型查询 警戒值最大值
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
	 * 根据节点号和传感器类型查询 警戒值最大值
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
	
	/**
	 * 获取警戒值对象
	 * @param node_id
	 * @return
	 * @throws Exception
	 */
	public maxmin getMaxminByNodeId(Integer node_id) throws Exception{
		
		maxmin mm = new maxmin();
		List<sensormeta> metas = queryByNodeId(node_id);
		for (sensormeta meta : metas) {
			if(meta.getSensor_type().equals("光照传感器")){
				mm.setLight_max(meta.getMax_alert());
				mm.setLight_min(meta.getMin_alert());
			}else if(meta.getSensor_type().equals("温度传感器")){
				mm.setTemp_max(meta.getMax_alert());
				mm.setTemp_min(meta.getMin_alert());
			}else if(meta.getSensor_type().equals("湿度传感器")){
				mm.setHumi_max(meta.getMax_alert());
				mm.setHumi_min(meta.getMin_alert());
			}else if(meta.getSensor_type().equals("土壤温度传感器")){
				mm.setSoiltemp_max(meta.getMax_alert());
				mm.setSoiltemp_min(meta.getMin_alert());
			}else if(meta.getSensor_type().equals("土壤湿度传感器")){
				mm.setSoilhumi_max(meta.getMax_alert());
				mm.setSoilhumi_min(meta.getMin_alert());
			}else{
				System.out.println("maxmin error!");
			}
		}
		
		return mm;
	}
	
	/**
	 * 更新数据库警戒值
	 * @param maxAlert
	 * @param sensorId
	 * @throws SQLException
	 */
	public void UpdateMaxalertBySensorId(String maxAlert,String sensorId) throws SQLException{
		Connection conn = DBUtil.getConnection();
		Statement stmt = conn.createStatement();
		String sql = "update sensormeta set max_alert="+maxAlert+" where sensor_id= "+sensorId;  
		stmt.executeUpdate(sql);
		stmt.close();
	}
	/**
	 * 更新最小警戒值
	 * @param minAlert
	 * @param sensorId
	 * @throws SQLException
	 */
	public void UpdateMinalertBySensorId(String minAlert,String sensorId) throws SQLException{
		Connection conn = DBUtil.getConnection();
		Statement stmt = conn.createStatement();
		String sql = "update sensormeta set min_alert="+minAlert+" where sensor_id= "+sensorId;  
		System.out.println(sql);
		stmt.executeUpdate(sql); 
		stmt.close();
	}
	public void UpdateLocationByNodeId(String location,String nodeId) throws SQLException{
		Connection conn = DBUtil.getConnection();
		Statement stmt = conn.createStatement();
		String sql = "update sensormeta set location='"+location+"' where node_id= "+nodeId;  
		System.out.println(sql);
		stmt.executeUpdate(sql); 
		stmt.close();
	}
	/**
	 * 更新开关状态
	 * @param minAlert
	 * @param sensorId
	 * @throws SQLException
	 */
	public void UpdateSwitchBySensorId(String switch_state,String sensorId) throws SQLException{
		Connection conn = DBUtil.getConnection();
		Statement stmt = conn.createStatement();
		String sql = "update sensor set switch_state='"+switch_state+"'  where sensor_id="+sensorId;
		
		System.out.println(sql);
		stmt.executeUpdate(sql); 
		stmt.close();
	}
}
