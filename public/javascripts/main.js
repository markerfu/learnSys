//main.js

$(function(){
	//导航菜单颜色
	$('.classInf a').click(function(){
		$('.classInf a').css('background-color','#cde7be');
		//$(this).addClass("activeclass");用addClass上面初始化不了？
		$(this).css('background-color','#98cf7a');
	});
	//编辑表单
	$('#editform').click(function(){
		$('#editform').css('display','none');
		$('#navform').css('visibility','visible');
		$('#fff').css('display','block');
		$('#showUserInf').css('display','none');
		$('#navlead cite').text('');
	});	
	//用户管理菜单
	
	$('#userclub a').click(function(){
		$('#showUserInf').html('');
		$('#navlead cite').text("");
		$('#showUserInf').css('display','block');
		$('#editform').css('display','block');
		$('#navform').css('visibility','hidden');
		var wclass = $(this).attr('value');
		//$(this).attr('href','userform?'+'userclass='+wclass);
		$.ajax({
			type:'GET',
			//url:'userform?'+'userclass='+wclass,
			url:'userform/'+wclass,
			dataType:'json',
			async:false,//这是重要的一步，防止重复提交
			success:function(data){				
				if(data!=""){
					$('#navlead cite').text("用户表单信息");				
					//$('#showUserInf').css('display','block');
					//$('#showUserInf').html('');
				}else{
					$('#navlead cite').text("");
					$('#showUserInf').css('display','block');					
					var tipHtml = '<p class="tiptext"><em>'+'什么也没有，开始编辑吧'+'</em></p>';						
					$('#showUserInf').html(tipHtml);
				}				
				//console.log(Boolean($('#navlead cite').text()))
				if($('#navlead cite').text()){					
					var tableHtml = '<table id="stdtable" class="col-xs-12">'
							+'<thead>'
							+'<tr>'
							+'<th>'+"序号"+'</th>'
							+'<th>'+"姓名"+'</th>'
							+'<th>'+"性别"+'</th>'
							+'<th>'+"学号"+'</th>'
							+'<th>'+"年级"+'</th>'
							+'<th>'+"操作"+'</th>'+'</tr>'
							+'</thead>';					
					data.forEach(function(item,index){						
						//console.log('--->>'+item.username+'<<---');
						tableHtml += '<tbody id="usertableInf">'
							+'<tr>'
							+'<td>'+(index+1)+'</td>'
							+'<td>'+item.username+'</td>'
							+'<td>'+item.usersex+'</td>'
							+'<td>'+item.usernumber+'</td>'
							+'<td>'+item.userclass+'</td>'
							+'</tr>'
							+'</tbody>';
					});
					$('#showUserInf').append(tableHtml+'</table>');					
				}else{
					return;
				}
				
				//console.log('--->>'+data+'<<---');
				//添加验证提示信息
				//$('#listTipTxt').text(data['result']);
			}
		});
		
	});
	
	
	
	
	/*
	$('#ddd').click(function(){
		//var va = $($('#userclub a')[1]).attr('value');
		//alert(va)
	});
	*/
});
