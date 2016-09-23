package com.model;

public class sensormeta {
	private Integer id;
	private Integer sensor_id;
	private String sensor_type;		
	private Integer node_id;
	private String description;
	private String location;
	private Integer max_alert;//¾¯½äÖµ
	private Integer min_alert;
	private String switch_state;
	private String status;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getSensor_id() {
		return sensor_id;
	}
	public void setSensor_id(Integer sensor_id) {
		this.sensor_id = sensor_id;
	}
	public String getSensor_type() {
		return sensor_type;
	}
	public void setSensor_type(String sensor_type) {
		this.sensor_type = sensor_type;
	}
	public Integer getNode_id() {
		return node_id;
	}
	public void setNode_id(Integer node_id) {
		this.node_id = node_id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Integer getMax_alert() {
		return max_alert;
	}
	public void setMax_alert(Integer max_alert) {
		this.max_alert = max_alert;
	}
	public Integer getMin_alert() {
		return min_alert;
	}
	public void setMin_alert(Integer min_alert) {
		this.min_alert = min_alert;
	}
	public String getSwitch_state() {
		return switch_state;
	}
	public void setSwitch_state(String switch_state) {
		this.switch_state = switch_state;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
