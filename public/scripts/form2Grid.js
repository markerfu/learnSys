//dd.js

//======================user_form_grid==============================//
var user_form = '<form method="post" action="/" id="userform">'+
//	'<label for="user_id"></label>'+
	'<div id="formbody">'+
	'<input type="hidden" id="user_id" name="user_id" />'+
	'<label for="username">姓名:</label>'+
	'<input type="text" id="username" name="username" placeholder="请输入姓名" />'+
	'<label for="usersex">性别:</label>'+
	'<input type="text" id="usersex" name="usersex" autocomplete="on" placeholder="请输入性别" list="usex" />'+
	'<datalist id="usex">'+
	'<option checked="checked">男</option>'+'<option>女</option>'+
	'</datalist>'+
	'<label for="usernum">学号:</label>'+
	'<input type="text" id="usernum" pattern="[0-9]{4}" autocomplete="off" name="usernum" placeholder="请输入学号" />'+
	'<label for="userclass">年级:</label>'+
	'<input type="text" id="userclass" name="userclass" placeholder="请输入年级" list="uclass" />'+
	'<datalist id="uclass" style="display:none;">'+
	'<option>一年级</option>'+'<option>二年级</option>'+'<option>三年级</option>'+'<option>四年级</option>'+
	'</datalist>'+
	'</div>'+
	'<div id="formbtns">'+
	'<input type="reset" id="reset" value="重  置" />'+
	'<input type="submit" id="submit" value="保  存" />'+
	'<input type="button" id="searchuser" value="查  询" />'+
	'<input type="button" id="edituser" value="编  辑" />'+
	'</div>'+'</form>';

function usergrid(chtml,post){
	var tablehtml = '<table id="usergridtable"><thead id="usergridthead"><tr>'+
		'<th class="user_ids">user_id</th>'+
		'<th class="ckbox_all"><input type="checkbox" value="全选" />全选</th>'+
		'<th class="user_nums">序号</th>'+
		'<th class="user_names">姓名</th>'+
		'<th class="user_sexes">性别</th>'+
		'<th class="user_classes">年级</th>'+
		'<th class="user_del">操作</th>'+'</tr></thead>'+
		'<tbody id="user_gridtbody">';

	var endtablehtml = '</tr></tbody></table>';
	
	var gridhtml = tablehtml+chtml+endtablehtml;
	//var gridhtml = tablehtml+tbodyhtml+endtablehtml;
	
	if(post!=""){
		$("#user_gridtbody").append(chtml);
	}else{
		$gridshow.html("");	
		$gridshow.append(gridhtml);
	}
}

//======================score_form_grid==============================//
//var score_form = "<h1>----Hi,Man----</h1>";
//*
var score_form = '<form method="post" action="/" id="scoreform">'+
	'<label for="scorestem">学 期:</label>'+
	'<input type="text" id="scorestem" required="required" name="scorestem" placeholder="请输入单号" />'+
	'<label for="scoreclass">年 级:</label>'+
	'<input type="text" id="scoreclass" required="required" name="scoreclass" placeholder="请输入年级" />'+
	'<div id="formbtns">'+
	'<input type="reset" id="reset" value="重  置" />'+
	'<input type="submit" id="submit" value="保  存" />'+
	'<input type="button" id="createscore" value="查  看" />'+
	'<input type="button" id="editscore" value="创  建" />'+
	'</div>'+'</form>';
//*/
function scoregrid(chtml){		
	var tablehtml = '<table id="scoregridtable"><thead id="scoregridthead"><tr>'+
		'<th class="score_ids">score_id</th>'+
		'<th class="ckbox_all"><input type="checkbox" value="全选" />全选</th>'+
		'<th class="score_nums">序号</th>'+
		'<th class="score_names">姓名</th>'+
		'<th class="score_sexes">性别</th>'+
		'<th class="score_classes">年级</th>'+
		'<th class="score_del">操作</th>'+'</tr></thead>'+
		'<tbody id="score_gridtbody">';

	var endtablehtml = '</tr></tbody></table>';
	
	var gridhtml = tablehtml+chtml+endtablehtml;
	//var gridhtml = tablehtml+tbodyhtml+endtablehtml;
	
	$gridshow.html("");	
	$gridshow.append(gridhtml);
}

//======================score_form_grid==============================//
var jdgue_form = "<h1>----评 论----</h1><p><small>实时更新</small></p>";

/*
//定义form数据对象	
var html_arr={
	user : user_form,
	score : score_form,
	jduge : jdgue_form,
}
*/











