package com.model;

import java.util.Date;

public class sensordata {
	private Integer id;
	private Date date;
	private String time;
	private float light;
	private float temp;
	private float humi;
	private float soiltemp;
	private float soilhumi;
	private int nodeId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public float getLight() {
		return light;
	}
	public void setLight(float light) {
		this.light = light;
	}
	public float getTemp() {
		return temp;
	}
	public void setTemp(float temp) {
		this.temp = temp;
	}
	public float getHumi() {
		return humi;
	}
	public void setHumi(float humi) {
		this.humi = humi;
	}
	public float getSoiltemp() {
		return soiltemp;
	}
	public void setSoiltemp(float soiltemp) {
		this.soiltemp = soiltemp;
	}
	public float getSoilhumi() {
		return soilhumi;
	}
	public void setSoilhumi(float soilhumi) {
		this.soilhumi = soilhumi;
	}
	public int getNodeId() {
		return nodeId;
	}
	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
	}
	
	
}
