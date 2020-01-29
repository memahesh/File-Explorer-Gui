$(document).ready(function(){


	$("form#getFilesForm").on("submit", function(e){
		e.preventDefault();
		let filePath = $('input[name=filePath]').val();
		eel.getFiles(filePath)(function(ret){
			addFilesToDOM(ret);
		});
	});

	function addFilesToDOM(ret){
		resetContentContainer();
		let div = $('div#contentContainer');
		let N = ret.length;
		for(let i=0; i<N; i++){
			div.append(contentDOM(ret[i][0], ret[i][1]));
		}
	}

	function contentDOM(fileName, fileType){
		let container = $('<div>', {class:'col-md-3'});
		let img = $('<img>', {src:'assets/'+fileType+'-icon.png', width:150});
		let p = $('<p>', {class:'text-info text-center'}).text(fileName);
		container.append(img);
		container.append(p);
		return container;
	}

	function resetContentContainer(){
		$('div#contentContainer').html("");
	}

});