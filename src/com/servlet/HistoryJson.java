package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.dao.sensordataDao;
import com.model.sensordata;

public class HistoryJson extends HttpServlet {

	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		String type = "temp";
		if(request.getParameter("type")!=null&&request.getParameter("type")!=""){
			type = request.getParameter("type");
		}
		int nodeId = 1;
		if(request.getParameter("nodeId")!=null&&request.getParameter("nodeId")!=""){
			nodeId = Integer.parseInt(request.getParameter("nodeId"));
		}
		String stdate = "2015-06-01";
 		String enddate = "2016-10-17"; 
 		if(request.getParameter("stdate")!=null&&request.getParameter("stdate")!=""){
 			stdate = request.getParameter("stdate");
		}
 		if(request.getParameter("enddate")!=null&&request.getParameter("enddate")!=""){
 			enddate = request.getParameter("enddate");
		}
 		System.out.println(stdate+" "+enddate);
		sensordataDao sdDao = new sensordataDao();
		List<sensordata> result = new ArrayList<sensordata>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			result = sdDao.queryByNodeIdAndDate(nodeId,stdate,enddate);
			int jiange = result.size()/100;
			jiange = jiange>0?jiange:1;
			JSONObject json=new JSONObject();  
		    JSONArray data = new JSONArray();
		    for(int i=result.size()-1;i>=0;i-=jiange){
		    	JSONObject member1 = new JSONObject();
		    	float value = 0;		    	
		    	member1.put("label", sdf.format(result.get(i).getDate()));	
		    	if(type.equals("temp")){
		    		value = result.get(i).getTemp();
		    	}else if(type.equals("humi")){
		    		value = result.get(i).getHumi();
		    	}else if(type.equals("light")){
		    		value = result.get(i).getLight();
		    	}else if(type.equals("soiltemp")){
		    		value = result.get(i).getSoiltemp();
		    	}else if(type.equals("soilhumi")){
		    		value = result.get(i).getSoilhumi();
		    	}
		    	
		    	DecimalFormat decimalFormat=new DecimalFormat(".00");//构造方法的字符格式这里如果小数不足2位,会以0补足.
		    	String p= decimalFormat.format(value);//format 返回的是字符串
		    	member1.put("value", p);
		    	data.add(member1);
		    }
		    System.out.println(data.toString());
			out.print(data.toString());
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		out.flush();
		out.close();
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
