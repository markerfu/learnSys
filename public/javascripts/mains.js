//mains.js

//对于不支持header,nav等元素给于创建
document.createElement("header");
document.createElement("nav");
document.createElement("footer");
document.createElement("aside");
document.createElement("section");

var $formshow = $("#formshow");
var $navbar = $("#navbar");
var $nav_bars = $("#nav_bars");
//var $navbarli = $("#navbar li");//定义不了???
var $gridshow = $("#gridshow");
	
var $userform = $("#userform"),
	$scoreform = $("#scoreform"),
	$jdugeform = $("#jdugeform"),
	$navbar_prev = $(".navbar_prev"),
	$navbar_next = $(".navbar_next");

var $pager = $("#pager"),
	$page_prev = $("#page_prev"),
	$page_next = $("#page_next"),
	$page_num = $("#page_num");

var $usergroup = $("#usergroup li"),
	$scoregroup = $("#scoregroup li"),
	$jdugegroup = $("#jdugegroup li");

var $scorelabel = $("#scorelabel"),
	$scorestemlist = $("#scorestemlist"),
	$createscore = $("#createscore"),
	$scorestem = $("#scorestem"),
	$submitscore = $("#submitscore");
	
//侧栏导航头标题
var $asidebarTips = $("h5");

//定义grid数据对象
var user_grid = {class1:[{name:'sdfgsdfs'},]};
var score_grid = {};
var	jduge_grid = {};

//定义pager显示条目
var pager = 5;

/*
//定义form数据对象
var html_arr={
	user : user_form,
	score : score_form,
	jdgue : jdgue_form,
}
*/

//检测导航栏中是否存在点击选项
function checkbartips(tip){
	var $tips = $("li",$navbar);
	var len = $tips.length;
	for(var i=0;i<len;i++){
		if($($tips[i]).text()==tip){
			var $that = $($tips[i]);
			navbartip_color($that);
			
			return true;			
		}
	}
	return false;
}

//初始化加载
$(function(){
	/*
	var ff={'ss':[],};
	//ff.s=[];
	var tt=[{name:'vivian'},{age:23}];
	tt.forEach(function(item,index){
		ff['ss'].push(item);
		console.log("---"+ff['ss'].length+"---")
		console.log("---"+ff['ss'][0].name+"---")
	})
	*/
		
	$("form",$formshow).hide();
	$("table",$gridshow).hide();
	$pager.hide();
		
	//首页导航栏图片添加
	$("#aside a li").prepend('<img src="/images/customer.gif" />&nbsp;');
	$("#aside h5").prepend('<img src="/images/pager.gif" />&nbsp;');
		
	//点击侧边导航，移除首页导航选项
	$("#aside a li").click(function(){
		//$("li:contains('首 页')",$navbar).remove();
		$("li:contains('首 页')",$navbar).css("display","none");
	});
	
	//用户管理
	$usergroup.click(function(e){
		
		//group = 'user',
		//barText = '用户管理'+clsText;
		var clsText = $(this).text(),
			asidebarText = $($asidebarTips[0]).text();
		var	barText = asidebarText+clsText;
		if(!checkbartips(barText)){			
			/*
			//addbartips(barText,group,cls,html_arr.user);
			//注意先后顺序，以免数据传送出现时间差
			//ajaxTo(group,cls);
			//addbartips(barText,group,cls,html_arr.user);
			*/
			var cls = $(this).attr("title"),
				group = $(this).attr("value");
			
			//dataGet(group,cls,function(datas){
			//不用datGet()换成通用的ajaxTo()
			var user_num = 0;
			var url = group+'/'+user_num+'?cls='+cls+'&pager='+pager,
				method = 'GET',
				data = {};
			ajaxTo(url,method,data,function(datas){
				user_grid[cls] = datas;
				addbartips(barText,group,cls);
			});			
		}else{
			li_have(barText);
		}
		return false;//阻止<a>标签跳转
	});
	
	//成绩管理
	$scoregroup.click(function(){
		var clsText = $(this).text(),
			asidebarText = $($asidebarTips[1]).text();
		var barText = asidebarText+clsText;
		if(!checkbartips(barText)){
			var cls = $(this).attr("title"),
				group = $(this).attr("value");
			
			//初始化时检测
			var url = group+'/'+null+'?cls='+cls,
				method = 'GET',
				data = {};
			ajaxTo(url,method,data,function(datas){					
				//console.log("-----"+datas+"-----");				
				if(datas!=null){
					//console.log(datas.docs)
					//console.log((datas.listdocs)[0].scorestemlist)
					//return false;												
					//score_grid[cls] = datas.docs;					
					score_grid[cls] = [];
					
					score_grid[cls]['data'] = datas.docs;					
					//console.log(score_grid[cls]['data'])					
					var stemlist = [];
					(datas.listdocs).forEach(function(item,index){
						stemlist.push(item.scorestemlist);
					});					
					score_grid[cls]['stemlist'] = stemlist;				
					//console.log(score_grid[cls]['stemlist'])

					addbartips(barText,group,cls);					
				}else{
					result("没有表单，ooOPs...请创建!");
					addbartips(barText,group,cls);				
				}
				//return false;
			});
			
		}else{
			li_have(barText);
		}
		
		return false;//阻止<a>标签跳转
	});
	
	//评论管理
	$jdugegroup.click(function(){
		var clsText = $(this).text(),
			asidebarText = $($asidebarTips[2]).text();
		var barText = asidebarText+clsText;	
		
		if(!checkbartips(barText)){
			var cls = $(this).attr("title"),
				group = $(this).attr("value");
				
			dataGet(group,cls,function(datas){
				jduge_grid[cls] = datas;
				addbartips(barText,group,cls);
			});			
		}else{
			li_have(barText);
		}
		return false;//阻止<a>标签跳转
	});
	
	//加载form、grid表单样式
	//$.getScript("/scripts/form2Grid.js");
	
	//$.load("/templates/user_form.html");
	//$.load("/templates/user_grid.html");
});

//也可以在外面加载form、grid表单样式
//$.getScript("/scripts/form2Grid.js");


window.onresize = function(){
	li_width();
}


