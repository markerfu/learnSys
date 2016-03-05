
/*
*同样的问题，由于是empty().append()，当前的对象只有最后
*一层存在。所以多次加载后并没有出现层次数量上的相应。
*
*解决方法一，可以通过判断将个组件的相应表单进行隐藏显示
*处理，始终保证对象与相应事件处于同一层。同时也避免了DOM结构
*始终处于改变状态
*/

function usergrid_show(data,clss,post,index_add){
	/*
	**post用来判断传入的数据是GET还是POST,
	**GET就加载所有数据POST只在grid中添加
	**POST的那一条数据，不刷新整个grid
	*/
	var post=post||"",
		index_add=index_add||"",
		tbodyhtml = "";
	data.forEach(function(item,index){
		if(post!=""){
			var len_tr = $("#usergridtbody tr").length;
			//console.log("---"+len_tr+"---"+pager+"---")
			if(len_tr>(pager-1)){
				pagebar_show((len_tr+1),$page_num.text());
				return;
			}
			//index=user_grid[clss].length-1;
			index = Number($("#usergridtbody .user_index:last").text());
		}
		//console.log("---"+item.username+"---")
		tbodyhtml += '<tr id="'+index+'"><td class="user_id">'+item._id+'</td>'+
			'<td class="ckbox_cell" style="display:none;">'+
			'<input type="checkbox" value="'+index+'"/></td>'+			
			'<td class="user_index">'+(index+1+index_add)+'</td>'+
			'<td class="user_num">'+item.usernum+'</td>'+
			'<td class="user_name">'+item.username+'</td>'+
			'<td class="user_sex">'+item.usersex+'</td>'+
			'<td class="user_class">'+item.userclass+'</td>'+
			'<td class="user_del">'+
			'<a href="#">'+'----'+'</a>'+
			'</td></tr>';

	});
	
	//$("#usergridtbody").empty().append(tbodyhtml);
	
	if(post!=""){
		$("#usergridtbody").append(tbodyhtml);		
	}else{
		$("#usergridtbody").empty().append(tbodyhtml);
		//console.log("---"+$("#usergridtbody tr").attr("id")+"---")
	}
	
	//$("#usergridtbody").empty().append(tbodyhtml);
	
	//因为是forEach()，待其执行结束才运行usergrid(tbodyhtml)。
	//usergrid(tbodyhtml,post);
	
	
	$(".user_num").click(function(){
		$(this).parents("tr").attr("class","info").css("color","red").siblings().attr("class","").css("color","");
		//$(this).siblings("td input[type=checkbox]").attr("checked",true);	
		//$("td input",$(this).parents("tr")).attr("checked",true);	
	});
}


