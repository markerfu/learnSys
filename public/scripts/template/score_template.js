
function scoregrid_show(data,index_add){
	/*
	**post用来判断传入的数据是GET还是POST,
	**GET就加载所有数据POST只在grid中添加
	**POST的那一条数据，不刷新整个grid
	*/
	//alert(data.length)
	var	index_add=index_add||"",
		tbodyhtml = "";
	data.forEach(function(item,index){		
		tbodyhtml += '<tr id="'+index+'"><td class="score_id">'+item._id+'</td>'+
			'<td class="ckbox_cell" style="display:none;">'+
			'<input type="checkbox" value="'+index+'" /></td>'+
			'<td class="score_index">'+(index+1+index_add)+'</td>'+
			'<td class="score_num">'+item.scorenum+'</td>'+
			'<td class="score_name">'+item.scorename+'</td>'+
			'<td class="score_sex">'+item.scoresex+'</td>'+
			'<td class="score_class">'+item.scoreclass+'</td>'+
			'<td class="score_Num">'+item.scorescoreNum+'</td>'+
			'<td class="score_del">'+'----'+'</td></tr>';
		//scoregrid(item['name']);
	});
	
	//scoregrid(tbodyhtml);
	$("#scoregridtbody").empty().append(tbodyhtml);

}

function user_scoregrid_show(data,index_add){
	/*
	**post用来判断传入的数据是GET还是POST,
	**GET就加载所有数据POST只在grid中添加
	**POST的那一条数据，不刷新整个grid
	*/
	var	index_add=index_add||"",
		tbodyhtml = "";
	data.forEach(function(item,index){
		tbodyhtml += '<tr id="'+index+'"><td class="score_id">'+item._id+'</td>'+
			'<td class="ckbox_cell" style="display:none;">'+
			'<input type="checkbox" value="'+index+'" /></td>'+
			'<td class="score_index">'+(index+1+index_add)+'</td>'+
			'<td class="score_num">'+item.usernum+'</td>'+
			'<td class="score_name">'+item.username+'</td>'+
			'<td class="score_sex">'+item.usersex+'</td>'+
			'<td class="score_class">'+item.userclass+'</td>'+
			'<td contentEditable="true" class="score_scoreNum">'+'</td>'+
			'<td class="score_del">'+'----'+'</td></tr>';

	});
	
	$("#scoregridtbody").empty().append(tbodyhtml);
		
}






