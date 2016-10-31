package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.sensordataDao;
import com.model.sensordata;

public class FileDownload extends HttpServlet {


	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//��ȡǰ̨����
		int node_id = 1;
		if(request.getParameter("node_id")!=null){
			node_id = Integer.parseInt(request.getParameter("node_id"));
		}
		String stdate = request.getParameter("stdate");
 		String enddate = request.getParameter("enddate"); 
 		
 		//��ѯ���ݿ�����
		sensordataDao data1dao = new sensordataDao();
		List<sensordata> result = new ArrayList<sensordata>();
		String str="";
		if(request.getParameter("light")!=null){
			str+="��������(Lx)";
			str+="\t";
		}
		if(request.getParameter("temp")!=null){
			str+="�����¶�(��C)";
			str+="\t";
		}
		if(request.getParameter("humi")!=null){
			str+="����ʪ��(g/m3)";
			str+="\t";
		}
		if(request.getParameter("soiltemp")!=null){
			str+="�����¶�(��C)";
			str+="\t";
			
		}
		if(request.getParameter("soiltemp")!=null){
			str+="����ʪ��(g/m3)";
			str+="\t";
		}
		str+="\r\n";
		try {
			result = data1dao.queryByNodeIdAndDate(node_id,stdate,enddate);
			for(int i=0;i<result.size();i++){
				if(request.getParameter("light")!=null){
					str+=result.get(i).getLight();
					str+="\t";
				}
				if(request.getParameter("temp")!=null){
					str+=result.get(i).getTemp();
					str+="\t";
				}
				if(request.getParameter("humi")!=null){
					str+=result.get(i).getHumi();
					str+="\t";
				}
				if(request.getParameter("soiltemp")!=null){
					str+=result.get(i).getSoiltemp();
					str+="\t";
				}
				if(request.getParameter("soilhumi")!=null){
					str+=result.get(i).getSoilhumi();
					str+="\t";
				}
				str+="\r\n";
				
			}
			
		} catch (Exception e) {			
			e.printStackTrace();
		}
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String datestr = sdf.format(date);
		String filename = "data"+datestr+".txt";
		//�����ļ�MIME����  
        response.setContentType(getServletContext().getMimeType(filename));  
        //����Content-Disposition  
        response.setHeader("Content-Disposition", "attachment;filename="+filename); 
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8"); 
		PrintWriter out = response.getWriter();
		
		out.write(str);
		out.flush();
		out.close();
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}
