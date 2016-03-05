//user_contral.js

//=====usergrid=================================================//
/*
*同样的问题，由于是empty().append()，当前的对象只有最后
*一层存在。所以多次加载后并没有出现层次数量上的相应。
*
*解决方法一，可以通过判断将个组件的相应表单进行隐藏显示
*处理，始终保证对象与相应事件处于同一层。同时也避免了DOM结构
*始终处于改变状态
*/
/*
//可以序列化表单serialize()，过滤作用。服务器端取对应属性值
var value = $("#formbody input").serialize();
//alert(value)
$.post('test',value,function(data){
	//alert(data.say)
});
return false;
*/					
//$("#userform")[0].reset();//????

/*
function result(msg){
	$("#message").empty().append(msg).show();
	setTimeout(function(){
		$("#message").hide();
	},3000);
}
*/
function form_validate(){
	$("#userform").validate({
        rules: {
			username: "required",
			usersex: "required",
			userclass: "required",
			usernum: {
				required: true,
				//pattern: '[0-9]{4}',
			},
			username: {
				required: true,
				minlength: 2,
			}
		},
		messages: {
			//username: "请输入姓名",
			usersex: "请输入性别",
			userclass: "请输入年级",
		
			usernum: {
				required: "请输入学号",
				//pattern: jQuery.format("密码应为四位有效数字"),
			},
		},
		
		submitHandler:function(form){
            alert("submitted");   
            form.submit();
        },
		
    });

}



var user_sb_state=false;
function userform_contral(group,cls){
	//console.log("-------"+group+"-------"+cls)
	
	var data = user_grid[cls]||[];
	usergrid_show(data.slice(0,pager),cls);
	//var pages = $page_num.text();
	pagebar_show(data.length);
	$("#pagination").hide();
	
	//向form中自动添加相应值
	//console.log("-------"+clsvalue[cls]+"-------")
	$("#userclass").val(clsvalue[cls]);
	
	//=========保存================
	if(!user_sb_state){
		user_sb_state=true;
		$("#submit").bind('click',function(){			
			//表单验证,回头用session,flash信息栏呈现
			//用插件来做验证
			
			form_validate();//???????不起作用?????
			//绑定的事件将其验证屏蔽了
			/*
			//序列化传送表单数据,
			var value = $("#formbody input").serialize(),
				postData = value;
			*/
			var	username = $("#username").val(),
				usersex = $("#usersex").val(),
				usernum = $("#usernum").val(),
				userclass = $("#userclass").val();
			//console.log("---"+$("#user_id").val()+"---")
			var clss = classvalue[userclass];
			var postData = {
			//	'user_id':user_id,
			//	'usercls':cls,
				'usercls':clss,
				'username':username,
				'usersex':usersex,
				'usernum':usernum,
				'userclass':userclass,
			};
			
			//判断保存还是更新,
			if($("#user_id").val()){
				//postData['user_id']属性不能写成postData[user_id]
				postData['_id'] = $("#user_id").val();
				//console.log("---"+postData['_id']+"---")
				var index = $("#usergridtbody .info .user_index").text();
				dataPost(group,clss,postData,function(data){
					//console.log("---"+data._id+"---")
					//console.log("---"+user_grid[clss].length+"---")
					//user_grid[clss].splice((index-1),(index-1),data);//???
					user_grid[clss].splice((index-1),1,postData);
					//usergrid_show(user_grid[clss],clss,"");
					
					//直接对其赋值
					var $chkobj = $("#usergridtbody .info");					
					$(".user_num",$chkobj).text(usernum);
					$(".user_sex",$chkobj).text(usersex);
					$(".user_name",$chkobj).text(username);
					$(".user_class",$chkobj).text(userclass);
							
					//usergrid_show([postData],clss,"");
				});
				
			}else{
				dataPost(group,clss,postData,function(data){
					//console.log("-------"+group+"-------"+classvalue[userclass])
					//因为是post，可以将提交数据直接push到对象数组
					user_grid[clss].push(data);
					//usergrid_show(user_grid[clss]);
					usergrid_show([data],clss,data);				
				});
			}
			//清空表单
			$("#formbody input:not(#userclass)").val("");
			
			return false;		
		});
		
		//=========删除================

		$("#deleteuser").bind('click',function(){
			var id = $("#usergridtbody .info .user_id").text();
			//alert(id)
			if(!id){
				result("请选择删除项!");
				return false;
			}
			//删除前做一个询问对话框
			//sys_confirm("真的要删除吗？");
			/*-----------*/

			$("#dialog_inf").dialog({				
				height: 160,
				modal: true,
				title: '系统提示',
				hide: 'slide',
				buttons: {
					'确定':function(){
						$(this).dialog("close");
						delet_tr();
					},
					'取消':function(){
						$(this).dialog("close");
						return;
					}
				},
				open: function(event, ui){
					$(this).html("");
					$(this).append("<p>真的要删除吗?</p>");
				}		
			});

			function delet_tr(){	
				var userclass = $("#userclass").val(),
					clss = classvalue[userclass];
				//console.log("---"+clss+"---");
				//获得相应的index序号为删除提供序列
				var index = $("#usergridtbody .info .user_index").text();
				//console.log("---"+index+"---");

				var url = group+'/'+id;
				//console.log(url)
				var data = {};
				ajaxTo(url,'delete',data,function(data){
					//console.log("---"+data.rst+"---");
					$("#usergridtbody .info").remove();
					//判断分页状态显示与否
					var pages = $page_num.text();
					var len_tr = $("#usergridtbody tr").length;
					if(pages>1&&len_tr>(pager-2)){
						pagebar_show((pager+1),pages);
					}else{
						pagebar_show((pager-1),pages);
					}
					//移除缓存内相应数据
					//console.log("---"+index+"---")
					user_grid[clss].splice((index-1),1);
				});			
			}
		
		});
	
		/*
		//将此放在usergrid_show()内使其增减删除都得到加载
		$(".user_num").click(function(){
			$(this).parents("tr").attr("class","info").css("color","red").siblings().attr("class","").css("color","");
			//$(this).siblings("td input[type=checkbox]").attr("checked",true);	
			//$("td input",$(this).parents("tr")).attr("checked",true);	
		});
		*/
		//=========编辑================
		$("#edituser").bind('click',function(){
			//获得选中对象
			var $chkobj = $("#usergridtbody .info");
			var user_num = $(".user_num",$chkobj).text(),
				user_sex = $(".user_sex",$chkobj).text(),
				user_id = $(".user_id",$chkobj).text(),
				user_name = $(".user_name",$chkobj).text();
			//console.log("---"+user_id+"---")
			//填充表单对应的input选项
			$("#username").val(user_name);
			$("#usernum").val(user_num);
			$("#usersex").val(user_sex);
			$("#user_id").val(user_id);
			//console.log("---"+$("#user_id").val()+"---")			
		});	
		
		//=========查询================
		
		//=========分页================
		$page_next.bind('click',function(){
			//alert(0)
			var pages = Number($page_num.text());
			var last_num = $(".user_num:last").text();
			var user_num = last_num;
			var userclass = $("#userclass").val(),
				clss = classvalue[userclass];
			var url = group+'/'+user_num+'?cls='+clss+'&pager='+pager,
				method = 'GET',
				data = {};
			ajaxTo(url,method,data,function(datas){
				var post = "";
				var index_add = pages*pager;
				usergrid_show(datas.slice(0,pager),clss,post,index_add);
				
				//alert(user_grid[cls].length)
				$page_num.text(pages+1);
				pagebar_show(datas.length,pages+1);
				
			});
			return false;
		});
		$page_prev.bind('click',function(){
			
			//获取的是在数据库从开始取满足条件的数据，不能紧挨着条件后面
			//不用skip，服务器端也要写两次状况。或者写到缓存内，有没有别的方法。
			//方法一：
			var pages = Number($page_num.text());
			var first_num = $(".user_num:first").text();
			var user_num = first_num;
			var userclass = $("#userclass").val(),
				clss = classvalue[userclass];
			var url = group+'/'+user_num+'?cls='+clss+'&pager=-'+pager,
				method = 'GET',
				data = {};
			ajaxTo(url,method,data,function(datas){
				var post = "";
				var index_add = (pages-2)*pager;
				usergrid_show(datas.slice(0,pager),clss,post,index_add);
				
				//alert(user_grid[cls].length)
				$page_num.text(pages-1);
				pagebar_show(datas.length+1,pages-1);
				
			});
			return false;
		});

	}
		
}
//============================删除对话框=========================================//
/*
function sys_confirm(content){
	$("#dislog_inf").dialog({		
		
		height: 140,
		modal: true,
		title: '系统提示',
		hide: 'slide',
		buttons: {
			'确定':function(){
				$(this).dialog("close");
				
			},
			'取消':function(){
				$(this).dialog("close");
				return;
			}
		},
		open: function(event, ui){
			$(this).html("");
			$(this).append("<p>"+content+"</p>");
		}
		
	});
}
*/		
		