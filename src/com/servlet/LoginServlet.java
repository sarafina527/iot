package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.NodeDao;
import com.dao.userDao;
import com.model.Users;

public class LoginServlet extends HttpServlet {



	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request,response);
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

		Users u = new Users();
		userDao ud = new userDao();
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		System.out.println(username);
		/*System.out.println(username+" "+password);*/
		List<Users> result = new ArrayList<Users>();
		if(username!=null&&password!=null){
			try {
				result = ud.queryUserByName(username);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		if(result==null||result.size()==0){
			/*System.out.println("null");*/
			response.sendRedirect(request.getContextPath()+"/loginerror.jsp");
		}else{
			String sp = result.get(0).getPassword();
//			System.out.println(sp);
			//判断用户名和密码是否合法
			if(password.equals(sp))
			{
				u = result.get(0);
				request.getSession().setAttribute("user", u);
				List<Integer> nodes = null;
				try {
					nodes = NodeDao.getNodesByUser(u.getUsername());
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				request.getSession().setAttribute("nodes", nodes);
				response.sendRedirect(request.getContextPath()+"/realtime.jsp");
			}
			else
			{
				response.sendRedirect(request.getContextPath()+"/loginerror.jsp");
			}
		}
		
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
