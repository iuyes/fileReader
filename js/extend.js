$(function(){
	/*创建文件*/
	$('#createFileBtn').click(function(){
		var fileName=$('#createFileForm #fileName').val();
		var path=$('#createFileForm #path').val();
		$.ajax({
			type:'POST',
			url:'index.php?act=createFile',
			data:{fileName:fileName,path:path},
			success:function(data){
				
				$('#createFile').modal('hide');
				$('#smallAlert .modal-body').html(data)
				$('#smallAlert').modal('show');
			}
		});
	});
	/*刷新页面*/
	$('#reload').click(function(){
		location.reload();
	});
	/*查看文件*/
	$('.showContentBtn').click(function(){
		var url=$(this).attr("data-url");
		$.ajax({
			type:'GET',
			url:url,
			success:function(data){
				$('#showContent .contentTextarea').html(data);
				$('#showContent').modal('show');
			}
		});
	});
	/*编辑文件*/
	$('.editContentBtn').click(function(){
		var url=$(this).attr("data-url");
		var fileName=$(this).attr("data-filename");
		$.ajax({
			type:'GET',
			url:url,
			success:function(data){
				$('#editContent .contentTextarea').html(data).attr('data-filename',fileName);
				$('#editContent').modal('show');
			}
		});
	});
	/*处理编辑文件*/
	$('.editContentSubmit').click(function(){
		var url="index.php?act=doEditContent";
		var content=$('#editContentTextarea').val();
		var fileName=$('#editContentTextarea').attr("data-filename");
		$.ajax({
			type:'POST',
			url:url,
			data:{fileContent:content,fileName:fileName},
			success:function(data){
				$('#editContent').modal('hide');
				$('#smallAlert .modal-body').html(data)
				$('#smallAlert').modal('show');
			}
		});
	});
	/*重命名文件*/
	$('.oldRowFileName').dblclick(function(){
		var oldFileName=$(this).html();
		var inputStr="<input type='text' class='form-control newFileName' value='"+oldFileName+"' data-oldFileName='"+oldFileName+"'/>";
		$(this).html('').parent('.changeFileName').find('.newRowFileName').html(inputStr);
	});
	$(document).on('blur','.newFileName',function(){
		var newFileName=$(this).val();
		var oldFileName=$(this).attr('data-oldFileName');
		if(newFileName==oldFileName){
			$('#smallAlert .modal-body').html("请填写新文件名称")
			$('#smallAlert').modal('show');
		}else{
			$.ajax({
				type:'POST',
				url:'index.php?act=renameFile',
				data:{newFileName:newFileName,oldFileName:oldFileName},
				success:function(data){
					$('#smallAlert .modal-body').html(data)
					$('#smallAlert').modal('show');
				}
			});			
		}

	});

});
