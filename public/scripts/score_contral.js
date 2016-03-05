
//=====scoregrid=================================================//

var score_sb_state=false;		
function scoreform_contral(group,cls){
	//======================grid表单初始化显示============================================
	//alert($("#nav_bars").width())
	//var data = score_grid[cls]['data']||[];
	var data = score_grid[cls]?score_grid[cls]['data']:[];
	scoregrid_show(data);
	
	var $scorestemlist = $("#scorestemlist");
	
	var stenlist = score_grid[cls]?score_grid[cls]['stemlist']:[];
	if(stenlist!=""){
		var option_html = "";
		for(var i=0,len=stenlist.length;i<len;i++){
			option_html+='<option>'+stenlist[i]+'</option>';
		}				
		$scorestemlist.empty().append(option_html).css("color","#919191"); 		
		//$("#scorestemlist").append("<option>"+stenlist[0]).css("color","#919191");
		$($("option",$scorestemlist)[0]).attr("checked",true);
		
		$("option",$scorestemlist).click(function(e){
			$(this).attr("checked",true).siblings().attr("checked",false);
		});
		
		var amount = data.length;
		grid_info(amount);
	}else{
		$scorestemlist.empty();
		grid_info();
	}
	
	//初始化分页导航
	//pagebar_show(data.length);
	$("#pagination").show();
	pagination_show(data.length);
	$("#pager").hide();
	
	//向form中自动添加相应值
	$("#scoreclass").val(clsvalue[cls]).css("color","#919191");
	
	//=========创建========================================================
	if(!score_sb_state){
		score_sb_state = true;
		
		var scorestem_text = "";
		var datas=[];
		
		$("#createscore").bind('click',function(e){
			//alert(0)form表单栏更改
			$scorelabel.text("创 建 单 号:");
			$scorestemlist.hide();
			$scorestem.show();
			$submitscore.show();
			
			//清空成绩栏
			
			
			//$(this).unbind().css("color","grey");
			$(this).hide();
			
			var scoreclass = $("#scoreclass").val();
			var clss = classvalue[scoreclass];
			//alert(clss)
			//grid表单栏替换
			//score_grid为空时获取user_grid表格数据
			/*
			*由于有分页的存在，每页的数据是独立获取的，
			*表单没有整体性，获得整张表单的数据比较麻烦
			*最好是一次性获取整张表单，通过隐藏部分表单来处理比较好。
			*
			*/
			//if(score_grid[clss]==null){
				//alert(0)
				//var group = "user";
				
				var score_num = $(".user_num:last").text();
				//var user_num = score_num?score_num:0;
				var user_num = 0;
				
				//var url = group+'/'+user_num+'?cls='+clss+'&pager='+pager,
				var url = "user"+'/'+user_num+'?cls='+clss,
					method = 'GET',
					data = {};
				ajaxTo(url,method,data,function(datas){
					//user_scoregrid_show(datas.slice(0,pager));
					
					user_scoregrid_show(datas);
					//alert(datas.length)
					//pagebar_show(datas.length);
				});
				/*和user_grid冒泡，由于是hide(),只能弄个新的
				//激活分页栏按钮组件
				var $scoregridtbody = $("#scoregridtbody");
				pagebar_prev2next(group,clss,$scoregridtbody,function(datas,index_add){
					user_scoregrid_show(datas.slice(0,pager),index_add);
					pagebar_show(datas.length);
				});
				*/
			//}else{
			//	return;
			//}
			
			//成绩输入栏验证,此对象只有创建后才显示所以放在其内
			//var $tr = $("#scoregridtbody tr");
			var $scoreNum = $("#scoregridtbody td.score_scoreNum");
			var data=[];
			
			$scoreNum.blur(function(){
				//alert("xfgxd")
				var $that = $(this);
				var td_score = $that.text();
				var $tr_Inf = $that.parent();
				var $td_Inf = $('td',$tr_Inf);
				var valid = /^\d{1,2}$/;
				
				if(td_score!=""&&valid.test(td_score)||td_score=="100"){
					$that.css("box-shadow","");
					var das = {
						scorename:$($td_Inf[4]).text(),
						scoresex:$($td_Inf[5]).text(),
						scorenum:$($td_Inf[3]).text(),
						scorescoreNum:Number(td_score),
						scoreclass:scoreclass,
						scorecls:clss,
					}
					//alert(das.scorename)
					
					//data.push(das);									
					//JSON.stringify(das);
					td_Arr(das);
				}else{
					$(this).css("box-shadow","0 0 2px #ae2f6f");
					result('请输入两位有效数字');
				}
				//console.log(data)
			});
			//var data=[];
			
			function td_Arr(arrs){
				var scorename = arrs.scorename;
				for(var i=0;i<data.length;i++){
					if(data[i].scorename==scorename){//while为判断不用,if为条件
						data.splice(i,1);
						//data.splice(i,1,arrs);//???再此处用data与定义的全局data不同
					}
				}
				data.push(arrs);
				datas = data;
			}
			
			//判断单号是否存在			
			$("#scorestem").blur(function(){
				var scorestem = $scorestem.val();
				if(scorestem==""){
					return result("单号不能为空，请创建新的单号！");
				}
				var scoreclass = $("#scoreclass").val(),
					clss = classvalue[scoreclass];
				var url = group+'/'+scorestem+'?cls='+clss,
					method = 'GET',
					data = {};
				ajaxTo(url,method,data,function(datas){					
					//console.log("-----"+datas+"-----");
					if(datas!=""){
						result("单号已存在，请创建新的单号！");
						scorestem_text = "";
						return false;
					}else{
						//submitscore_grid();
						scorestem_text = scorestem;						
					}
				});			
			});
						
		});
		
		//=========保存============================================					
		//提交表单数据	
		$("#submitscore").bind('click',function(){
			//第一学期
			//alert(scorestem_text)
			//console.log(datas.length)

			var valid = /^\d{1,2}$/;
			var $scoreNum = $("#scoregridtbody td.score_scoreNum");
			if(scorestem_text==""){
				result("请创建新的成绩单号！","alert alert-danger");
				return false;
			}
			/*
			$scoreNum.each(function(index,item){
				var val = Number($(item).text());
				if(val==""||!valid.test(val)||val>100){					
					//return result("表单成绩输入不完整！");
					return result("表单成绩输入不完整！","alert alert-danger");
				}			
			});
			*/
			//var len=$scoreNum.length;
			for(var i=0,len=$scoreNum.length;i<len;i++){
				var val = Number($($scoreNum[i]).text());
				if(val==""||!valid.test(val)||val>100){					
					//return result("表单成绩输入不完整！");
					result("表单成绩输入不完整！","alert alert-danger");
					return false;
				}	
			}
			
			//为初始化时获取表单信息，存入一个标记
			var scoreclass = $("#scoreclass").val(),
				clss = classvalue[scoreclass];
			var scoretip ={"scoretip" : "scoretip","scorecls" : clss};
			datas.push(scoretip);
			
			datas.forEach(function(item,index){
				item.scorestemlist = scorestem_text;
			});
			
			/*
			//此处直接传递"datas":datas到服务器解析不了，要转成字符串格式
			//慢慢试出来的，不知道原因，????
			//var data = {"scorestem_text":scorestem_text,"datas":datas};
			*/
			var url = group,
				method = 'POST',
				data = {"scorestem_text":scorestem_text,"datas":JSON.stringify(datas)};
							
			//提交数据			
			ajaxTo(url,method,data,function(datas){					
				//console.log("-----"+datas+"-----");
				if(datas!=""){
					$scoreNum.text("");
					//$scorestem.val("");
					//return result("单号保存成功!");
					return result("单号保存成功!","alert alert-success");
				}
				//result("单号保存有误!");
				result("单号保存有误!","alert alert-danger");
			});
			
			return false;
		});	
		
		//=========查看===========================================
		$("#checkscore").bind('click',function(e){
			//alert(0)			
			var scorestem = $("option[checked='checked']",$scorestemlist).text();
			var scoreclass = $("#scoreclass").val(),
				cls = classvalue[scoreclass];
			var url = group+'/'+scorestem+'?cls='+cls,
				method = 'GET',
				data = {};
				
			ajaxTo(url,method,data,function(datas){	
				//alert(datas)
				scoregrid_show(datas);
				//console.log(datas)
				pagination_show(datas.length);
				
				grid_info(datas.length);
			});			
			return false;
		});	
		
	}
	
		
}	

function grid_info(amount){
	var $score_Num = $(".score_Num");
	var amount = amount?amount:0;
	var total_scoreNum = 0;
		
	for(var i=0,len=$score_Num.length;i<len;i++){
		//alert($($score_Num[i]).text())
		total_scoreNum += Number($($score_Num[i]).text());
	}
	var average = isNaN(Math.round(total_scoreNum/amount))?0:Math.round(total_scoreNum/amount);
	
	$("#grid_info i:first").text(amount);
	$("#grid_info i:last").text(average);
	return;
}




	

