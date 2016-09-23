package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.sensordataDao;
import com.dao.sensormetaDao;
import com.model.Anlysis;
import com.model.PageBean;
import com.model.maxmin;
import com.model.sensordata;

public class HistoryServlet extends HttpServlet {

	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int node_id = 1;
		if(request.getParameter("node_id")!=null){
			node_id = Integer.parseInt(request.getParameter("node_id"));
		}
		String stdate = request.getParameter("stdate");
 		String enddate = request.getParameter("enddate"); 

		sensordataDao data1dao = new sensordataDao();
		List<sensordata> result = new ArrayList<sensordata>();
		
		try {
			result = data1dao.queryByNodeIdAndDate(node_id,stdate,enddate);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		sensormetaDao metaDao = new sensormetaDao();
//		maxmin mm = new maxmin();
//		try {
//			mm = metaDao.getMaxminByNodeId(node_id);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		Anlysis anl = new Anlysis();
		if(result.size()!=0){
			
		
		float lightave=0,lightmax=result.get(0).getLight(),lightmin=result.get(0).getLight();
		float tempave=0,tempmax=result.get(0).getTemp(), tempmin=result.get(0).getTemp(); 
		float humiave=0,humimax=result.get(0).getHumi(),humimin=result.get(0).getHumi();
		float soiltempave=0,soiltempmax=result.get(0).getSoiltemp(),soiltempmin=result.get(0).getSoiltemp();
		float soilhumiave=0,soilhumimax=result.get(0).getSoilhumi(),soilhumimin=result.get(0).getSoilhumi();
		for(int i=0;i<result.size();i++){
			float lighti = result.get(i).getLight();
			float tempi = result.get(i).getTemp();
			float humii = result.get(i).getHumi();
			float soiltempi = result.get(i).getSoiltemp();
			float soilhumii = result.get(i).getSoilhumi();
			lightave+=lighti;
			if(lightmax<lighti){
				lightmax = lighti;
			}
			if(lightmin>lighti){
				lightmin = lighti;
			}
			
			tempave+=tempi;
			if(tempmax<tempi){
				tempmax = tempi;
			}
			if(tempmin>tempi){
				tempmin = tempi;
			}
			humiave+=humii;
			if(tempmax<humii){
				tempmax = humii;
			}
			if(tempmin>humii){
				tempmin = humii;
			}
			soiltempave+=soiltempi;
			if(soiltempmax<soiltempi){
				soiltempmax = soiltempi;
			}
			if(soiltempmin>soiltempi){
				soiltempmin = soiltempi;
			}
			soilhumiave+=soilhumii;
			if(soilhumimax<soilhumii){
				soilhumimax = soilhumii;
			}
			if(soilhumimin>soilhumii){
				soilhumimin = soilhumii;
			}
		}
		lightave = lightave/result.size();
		tempave = tempave/result.size();
		humiave = humiave/result.size();
		soiltempave = soiltempave/result.size();
		soilhumiave = soilhumiave/result.size();
		anl.setLightave(lightave);
		anl.setLightmax(lightmax);
		anl.setLightmin(lightmin);
		anl.setTempave(tempave);
		anl.setTempmax(tempmax);
		anl.setTempmin(tempmin);
		anl.setHumiave(humiave);
		anl.setHumimax(humimax);
		anl.setHumimin(humimin);
		anl.setSoiltempave(soiltempave);
		anl.setSoiltempmax(soiltempmax);
		anl.setSoiltempmin(soiltempmin);
		anl.setSoilhumiave(soilhumiave);
		anl.setSoilhumimax(soilhumimax);
		anl.setSoilhumimin(soilhumimin);
		
		int page = 1;
		if(request.getParameter("page")!=null){
			page = Integer.parseInt(request.getParameter("page"));
		}
		
		
		PageBean pagebean=new PageBean(10);//初始化PageBean对象  
		//设置当前页  
		pagebean.setCurPage(page); //这里page是从页面上获取的一个参数，代表页数  
		//获得分页大小  
		int pagesize=pagebean.getPageSize();  
		//获得分页数据在list集合中的索引  
		int firstIndex=(page-1)*pagesize;  
		int toIndex=page*pagesize;  
		if(toIndex>result.size()){  
		    toIndex=result.size();  
		}  
		if(firstIndex>toIndex){  
		    firstIndex=0;  
		    pagebean.setCurPage(1);  
		}  
		//截取数据集合，获得分页数据  
		List courseList=result.subList(firstIndex, toIndex);
		
		request.setAttribute("node_id", node_id);
		
		request.setAttribute("result", courseList);
		request.setAttribute("anl", anl);
//		request.setAttribute("mm", mm);
		}
//		response.sendRedirect("../history.jsp");
		request.getRequestDispatcher("../history.jsp").forward(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}
