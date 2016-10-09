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
//根据节点号和数据源取前10条数据
public class rtJsonServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String type = "temp";
		if(request.getParameter("type")!=null&&request.getParameter("type")!=""){
			type = request.getParameter("type");
			System.out.println(type);
		}
		int nodeId = 1;
		if(request.getParameter("nodeId")!=null&&request.getParameter("nodeId")!=""){
			nodeId = Integer.parseInt(request.getParameter("nodeId"));
			System.out.println(nodeId);
		}
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		sensordataDao sdDao = new sensordataDao();
		List<sensordata> result = new ArrayList<sensordata>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			result = sdDao.queryMultByTypeAndNodeId(type,nodeId);
			JSONObject json=new JSONObject();  
		    JSONArray data = new JSONArray();
		    for(int i=result.size()-1;i>=0;i--){
		    	JSONObject member1 = new JSONObject();
		    	float value = 0;
//		    	member1.put("label", sdf.format(result.get(i).getDate()));	
		    	//修改成传时间
		    	member1.put("label", result.get(i).getTime());	
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
		}
		
		out.flush();
		out.close();
	}

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request,response);
	}

}
