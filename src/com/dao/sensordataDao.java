package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.db.DBUtil;
import com.model.sensordata;



public class sensordataDao {
	
	public void addSensorinfo_1(){
		Connection conn = DBUtil.getConnection();
	}
	public void delSensorinfo_1(){
		Connection conn = DBUtil.getConnection();
	}
	public void updateSensorinfo_1(){
		Connection conn = DBUtil.getConnection();
	}
	//倒序查询所有
	public List<sensordata> queryByNodeId(int nodeId) throws Exception{
		
		List<sensordata> result = new ArrayList<sensordata>();		
		Connection conn = DBUtil.getConnection();
		String sql = "select * from sensordata where node_id = ? order by id desc";		
		PreparedStatement prestmt = conn.prepareStatement(sql);
		prestmt.setInt(1, nodeId);
		ResultSet rs = prestmt.executeQuery();		
		sensordata s = null;		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		while(rs.next()){
			s = new sensordata();
			s.setId(rs.getInt("id"));
			s.setDate(sdf.parse(rs.getString("date")));//日期格式转换
			s.setTime(rs.getString("time"));
			s.setLight(rs.getFloat("light"));
			s.setTemp(rs.getFloat("temp"));
			s.setHumi(rs.getFloat("humi"));
			s.setSoiltemp(rs.getFloat("soiltemp"));
			s.setSoilhumi(rs.getFloat("soilhumi"));	
			s.setNodeId(nodeId);
			result.add(s);			
		}		
		return result;
	}
	public sensordata queryTop1ByNodeId(int nodeId) throws Exception{		
		Connection conn = DBUtil.getConnection();
		String sql = "select * from sensordata where node_id = ? order by id desc limit 1";		
		PreparedStatement prestmt = conn.prepareStatement(sql);
		prestmt.setInt(1, nodeId);
		ResultSet rs = prestmt.executeQuery();		
		sensordata s = null;		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		while(rs.next()){
			s = new sensordata();
			s.setId(rs.getInt("id"));
			s.setDate(sdf.parse(rs.getString("date")));//日期格式转换
			s.setTime(rs.getString("time"));
			s.setLight(rs.getFloat("light"));
			s.setTemp(rs.getFloat("temp"));
			s.setHumi(rs.getFloat("humi"));
			s.setSoiltemp(rs.getFloat("soiltemp"));
			s.setSoilhumi(rs.getFloat("soilhumi"));	
			s.setNodeId(nodeId);
			break;			
		}		
		return s;
	}
	//按日期查询
	public List<sensordata> queryByNodeIdAndDate(int nodeId,String stdate,String enddate) throws Exception{
		
		List<sensordata> result = new ArrayList<sensordata>();
		String sql = "select * from sensordata where node_id = ? and DATE(date) between ? and ? order by id desc;";
		Connection conn = DBUtil.getConnection();
		PreparedStatement prestmt = conn.prepareStatement(sql);
		prestmt.setInt(1, nodeId);
		prestmt.setString(2, stdate);
		prestmt.setString(3, enddate);
		ResultSet rs = prestmt.executeQuery();	
		
		sensordata s = null;		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		while(rs.next()){
			s = new sensordata();
			s.setId(rs.getInt("id"));
			s.setDate(sdf.parse(rs.getString("date")));//日期格式转换
			s.setTime(rs.getString("time"));
			s.setLight(rs.getFloat("light"));
			s.setTemp(rs.getFloat("temp"));
			s.setHumi(rs.getFloat("humi"));
			s.setSoiltemp(rs.getFloat("soiltemp"));
			s.setSoilhumi(rs.getFloat("soilhumi"));
			
			result.add(s);			
		}		
		return result;
	}
	//todo
	public sensordata get(){
		Connection conn = DBUtil.getConnection();
		return null;
	}
	//查询top1 各个指标的值
	public float queryTopByTypeAndNodeId(String type,int nodeId) throws SQLException{
		String sql = "select * from sensordata where node_id=? order by id desc limit 1";
		Connection conn = DBUtil.getConnection();
		PreparedStatement prestmt = conn.prepareStatement(sql);
		prestmt.setInt(1, nodeId);
		ResultSet rs = prestmt.executeQuery();
		float value=0;
		while(rs.next()){
			value = rs.getFloat(type);
			break;
		}
		return value;
		
	}
	
	
	//查询前10条数据
	public List<sensordata> queryMultByTypeAndNodeId(String type,int nodeId) throws SQLException, ParseException{
		
		List<sensordata> result = new ArrayList<sensordata>();
		String sql = "select * from sensordata where node_id=? order by id desc limit 10";
		Connection conn = DBUtil.getConnection();
		PreparedStatement prestmt = conn.prepareStatement(sql);
		prestmt.setInt(1, nodeId);
		ResultSet rs = prestmt.executeQuery();
		
		sensordata s = null;		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		while(rs.next()){
			s = new sensordata();
			s.setId(rs.getInt("id"));
			s.setDate(sdf.parse(rs.getString("date")));//日期格式转换
			s.setTime(rs.getString("time"));
			s.setLight(rs.getFloat("light"));
			s.setTemp(rs.getFloat("temp"));
			s.setHumi(rs.getFloat("humi"));
			s.setSoiltemp(rs.getFloat("soiltemp"));
			s.setSoilhumi(rs.getFloat("soilhumi"));
			
			result.add(s);			
		}
		return result;
	}

	
}
