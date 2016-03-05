//userform.js

//----------------------------------//
//***********接口函数***************//
//----------------------------------//
//定义导航条显示数量
var n = 3;
function addbartips(tip,group,cls){		
	$navbar.append('<li name="show" group='+group+' cls='+cls+'><b>'+tip+'</b><a href="#"><img src="/images/del.gif" /></a></li>');	
	var $li_show = $("li[name='show']",$navbar),
		li_show_len = $($li_show).length,
		$li_show_first = $($li_show[0]),
		$li_show_last = $($li_show[li_show_len-1]);
	if(li_show_len>n+1){
		navbar_limit_show($li_show_first);		
		$li_show_last = $($li_show[n+1]);		
	}
	navbartip_color($li_show_last);
	
	//给添加的导航条做事件绑定	
	removebartips($li_show_last);	
	li_width();
	
	return;
}
//导航条宽度自适应
function li_width(){
	var width = $nav_bars.width();
	var li_nums = $("li",$navbar).length-1;
	if(li_nums*170>width){
		var re_width = width/(li_nums+2)+'px';
		$("li b",$navbar).css("width",re_width);
		//$("li b",$navbar).css("color","red");
	}else{
		$("li b",$navbar).css("width","");
	}
}
	
//侧边栏点击显示导航栏中的隐藏导航条
function li_have(liText){	
	var $lis_show = $("li[name='show']",$navbar);
	//当前窗口判断
	for(var i=0;i<n+1;i++){
		if($($lis_show[i]).text()==liText)
			return;
	}
	//在隐藏的导航条中查找获得相应属性
	var $li_s = $("li[name!='show']",navbar),
		len = $li_s.length;
	
	for(var i=0;i<len;i++){//已存在，不用做空判断
		if($($li_s[i]).text()==liText){				
			li_show($($li_s[i]));
		}		
	}	
	return;	
}	

//查找导航栏中的隐藏导航条
function li_show(li2show){
	var $li2show = li2show;
	//console.log("----"+$li2show.attr("name")+"---")
	if($li2show.attr("name")=="left_hidden"){
		odd($li2show);
	}else{
		//前面已经判断存在,所以不在左边就在右边
		opp($li2show);
	}	
}

//移除导航栏选项
function removebartips($add_li){
	function bar_li_show(){
		//alert($(this).text())
		var $that = $(this);
		navbartip_color($that)
	}
	function bar_li_remove(){		
		var $that = $(this).parent().parent();
		$that.remove();
		
		var $left_hidden_last = $("li[name='left_hidden']:last",$navbar),
			$right_hidden_first = $("li[name='right_hidden']:first",$navbar);

		if($right_hidden_first.length>0){
			$right_hidden_first.attr("name","show").css("display","block");
			//alert($right_hidden_first.text())

			navbartip_color($right_hidden_first);
			li_width();
			return false;
		}
		if($left_hidden_last.length>0){
			$left_hidden_last.attr("name","show").css("display","block");
			//alert($right_hidden_first.text())
			
			navbartip_color($left_hidden_last);
		}else{
			var $li_last = $($("li[name='show']:first",$navbar));
			navbartip_color($li_last);
		}
		prev2next_show();
		//console.log(user_grid)
		li_width();
		return false;
	}
	
	$add_li.bind('click', bar_li_show);
	$("img",$add_li).bind('click',bar_li_remove);
}

//导航条样式选中改变
function navbartip_color(that){
	//alert(0)
	var $navbar_li = $("li[state='showing']",$navbar);
	$navbar_li.attr("state","").css({"background-color":"","color":""});
	var $that = that;
	$that.attr("state","showing").css({"background-color":"#fff","color":"#202020"});
	//that.addClass("bcolors");????
	
	//获取此对象的相应属性,更新窗口
	var group = $that.attr("group");	
	var cls = $that.attr("cls");
	//console.log("----"+group+"---"+cls)
	switch(group){
		case "user":		
			$("#userform").show().siblings().hide();			
			$("#usergridtable").show().siblings().hide();		
			userform_contral(group,cls);
			break;
		case "score":		
			$("#scoreform").show().siblings().hide();
			$("#scoregridtable").show().siblings().hide();
			scoreform_contral(group,cls);
			
			$scorelabel.text("查 询 单 号:");
			$scorestemlist.show();
			$createscore.show();
			$scorestem.hide();
			$submitscore.hide();			
			break;
		case "jdgue":			
			$("#jdgueform").show().siblings().hide();
			$("#jdguegridtable").show().siblings().hide();
			jdgueform_contral(group,cls);
			
			//jdgueform_contral(group,cls);
			break;
		default:
			$("#shouye").show().siblings().hide();
			$("table",$gridshow).hide();
			
			//$gridshow.empty();
			//$formshow.empty().load("shouye");
			$("li:contains('首 页')",$navbar).css("display","block");
					
			//$formshow.empty().append('<h1 style="margin: 30% 0 0 30%;">404!ERROR</h1>').show();
			break;
	}
	
}

//处理超出限制导航菜单，并归入左隐藏
function navbar_limit_show(show2hidden){
	//alert(show2hidden.text())	
	$li_left_hidden = show2hidden;
	$($li_left_hidden).attr("name","left_hidden").css("display","none");
	
	prev2next_show();
	//激活导航条进度按钮
	li_prev2next();
	return;	
}
//定义导航条进度显示
function prev2next_show(){
	var left_hidden_len = $("li[name='left_hidden']",$navbar).length;
	$navbar_next[0].style.display = (left_hidden_len>0)?"block":"";
	
	var right_hidden_len = $("li[name='right_hidden']",$navbar).length;
	$navbar_prev[0].style.display = (right_hidden_len>0)?"block":"";	
}
//定义页面跳转栏显示
/*
function pagebar_show(cls,page_num){
	var page_num = page_num?page_num:1;
	var data_len = user_grid[cls].length;
	if(data_len>pager){
		$pager.show();
	}else{
		return $pager.hide();
	}
	if(page_num==1){
		$page_prev.hide();
	}else{
		$page_prev.show();
	}
	if(data_len<(page_num*pager)){
		$page_next.hide();
	}else{
		$page_next.show();
	}
	return;
}
*/
/*
//分页栏按钮事件绑定
function pagebar_prev2next(group,clss,callback){
	//=========分页================
	$page_next.bind('click',function(){
		//alert(0)
		var pages = Number($page_num.text());
		var last_num = $(".user_num:last").text();
		var user_num = last_num;
		console.log(user_num)
		//var userclass = $("#userclass").val(),
		//	clss = classvalue[userclass];
		var url = group+'/'+user_num+'?cls='+clss+'&pager='+pager,
			method = 'GET',
			data = {};
		ajaxTo(url,method,data,function(datas){
			var post = "";
			var index_add = pages*pager;
			//usergrid_show(datas.slice(0,pager),clss,post,index_add);
			callback(datas,index_add);
			
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
		//var userclass = $("#userclass").val(),
		//	clss = classvalue[userclass];
		var url = group+'/'+user_num+'?cls='+clss+'&pager=-'+pager,
			method = 'GET',
			data = {};
		ajaxTo(url,method,data,function(datas){
			var post = "";
			var index_add = (pages-2)*pager;
			//usergrid_show(datas.slice(0,pager),clss,post,index_add);
			callback(datas,index_add);
			
			//alert(user_grid[cls].length)
			$page_num.text(pages-1);
			pagebar_show(datas.length+1,pages-1);
			
		});
		return false;
	});
}
*/
//分页栏显示判断
function pagebar_show(rows,page_num){
	var pages = page_num?page_num:null;
	if(!pages){
		//alert(0)
		pages = 1;
		$page_num.text("1");
	}
	//alert(typeof(rows))
	//console.log("---"+rows+"---"+pages+'---')
	if(rows>pager||pages!=1){
		$pager.show();
		//$page_num.text("");
	}else{
		return $pager.hide();
	}
	if(pages!=1){
		//$page_prev.show();
		$page_prev.css("visibility","visible");
	}else{
		//$page_prev.hide();
		$page_prev.css("visibility","hidden");
	}
	if(rows>pager){
		//$page_next.show();
		$page_next.css("visibility","visible");
	}else{
		//$page_next.hide();
		$page_next.css("visibility","hidden");
	}
}

//pagination分页栏
function pagination_show(len){
	var n_html = '<li><a href="#">'+'&laquo;'+'</a></li>'+
		'<li class="active"><a href="#">'+1+'</a></li>';
	var n_show = Math.ceil(len/pager);
	for(var i=1;i<n_show;i++){
		n_html+='<li><a href="#">'+(i+1)+'</a></li>';			  
	}
	n_html+='<li><a href="#">'+'&raquo;'+'</a></li>';
	$("#pagination").empty().append(n_html);
	//将分页栏绑定到表单信息显示
	scoregridtbody_tr_show();
	//var $scoregridtbody_tr = $("#scoregridtbody tr");
	//$($scoregridtbody_tr[0]).show().siblings().hide();
	$("#pagination li").bind('click',function(e){
		//alert($(this).text())
		$(this).attr("class","active").siblings().attr("class","");
		var tr_n = $(this).text();
		scoregridtbody_tr_show(tr_n);
		
		return false;
	});
}
function scoregridtbody_tr_show(tr_n){
	var $scoregridtbody_tr = $("#scoregridtbody tr");
	$scoregridtbody_tr.hide();
	
	var tr_n = tr_n?tr_n:1,
		i = (tr_n-1)*pager,
		j = tr_n*pager;
	for(;i<j;i++){
		$($scoregridtbody_tr[i]).show();
	}
}

//绑定导航条进度按钮prev、next激活事件
var li_state = false;
function li_prev2next(){
	if(!li_state){
		//给$navbar_next绑定触发事件
		$($navbar_next).bind('click',function(){			
			var $li_show_prev = $("li[state='showing']",$navbar).prev();
			$("li[name='left_hidden']:last",$navbar).attr("name","show").css("display","block");			
			odd($li_show_prev);			
		});
		
		//给$navbar_prev绑定触发事件
		$($navbar_prev).bind('click',function(){			
			var $li_show_next = $("li[state='showing']",$navbar).next();
			$("li[name='right_hidden']:first",$navbar).attr("name","show").css("display","block");			
			opp($li_show_next);			
		});
		
		li_state = true;
	}	
}

//
function odd(li_li){
	var $li_li = li_li;
	var $li_show_last = $("li[name='show']:last",$navbar);
		$li_show_last.attr("name","right_hidden").css("display","none");
		$li_li.attr("name","show").css("display","block");

	navbartip_color($li_li);
	prev2next_show();
		
}
function opp(li_li){
	var $li_li = li_li;
	
	var $li_show_first = $("li[name='show']:first",$navbar);
		$li_show_first.attr("name","left_hidden").css("display","none");
		$li_li.attr("name","show").css("display","block");
	
	navbartip_color($li_li);
	prev2next_show();
}
//信息提示栏
function result(msg,bkg){
	//$("#message").empty().append(msg).show();
	var bkg = bkg||"alert alert-warning";
	$("#message").empty().attr("class",bkg).append(msg).show();
	setTimeout(function(){
		$("#message").hide();
	},5000);
}

//cls值转换
var clsvalue = {
	class1 : "一年级",
	class2 : "二年级",
	class3 : "三年级",
	class4 : "四年级",
}

var classvalue = {
	一年级 : "class1",
	二年级 : "class2",
	三年级 : "class3",
	四年级 : "class4",
}

//form表单数据请求userPost,用callback使其通用
function dataPost(group,cls,postData,callback){
	$.ajax({
		type : "POST",
		//url : 'http://localhost:3000/admin/'+group+'?cls='+cls,
		url : group+'?cls='+cls,
		data : postData,
		dataType : "json",
		async : false,
		success : function(data){			
			callback(data);				
		}
	})
}

//数据请求
function dataGet(group,cls,callback){
	var data = {'cls':cls};
	$.ajax({
		type : 'GET',
		//url:'http://localhost:3000/admin/'+group,
		url: group,
		data : data,
		dataType : 'json',
		async : false,
		success : function(datas){
			callback(datas);
		}
	});
}

//数据请求
function ajaxTo(url,method,data,callback){
	//var data = data?data:[];
	//var data = {'cls':cls};
	$.ajax({
		type : method,
		//url:'http://localhost:3000/admin/'+group,
		url: url,
		data : data,
		dataType : 'json',
		async : false,
		success : function(datas){
			callback(datas);
		}
	});
}
	


	

