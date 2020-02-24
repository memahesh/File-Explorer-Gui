$(document).ready(function(){

	function getPathText(){
		return $('input[name=filePath]').val();
	}

	function updatePathText(path){

		// console.log(path+"-update");
		// The 3 updates are necessary. See below link for bug and solution
		// https://www.willis-owen.co.uk/jquery-changing-form-values-not-affecting-the-dom/
		$('input[name=filePath]').attr('value', path);
		$('input[name=filePath]').attr('defaultValue', path);
		$('input[name=filePath]').val(path);
		// console.log(getPathText()+"-afterUpdate");
	}

	function getNewFiles(filePath){
		eel.getFiles(filePath)(function(ret){
			if(ret[0] == 200){
				updatePathText(ret[1]);
				addFilesToDOM(ret[2]);				
			}else if(ret[0] == 404){
				alert("Path not found. Please check the path again");
			}
		});
	}

	$("form#getFilesForm").on("submit", function(e){
		e.preventDefault();
		getNewFiles(getPathText());
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
		let container = $('<div>', {class:'col-md-3 file'});
		let img = $('<img>', {src:'assets/'+fileType+'-icon.png', width:150});
		let p = $('<p>', {class:'text-info text-center'}).text(fileName);
		container.append(img);
		container.append(p);
		container.on('click', function(){
			let newWorkingDir = getPathText()+fileName+"\\";
			getNewFiles(newWorkingDir);
		});
		return container;
	}

	function resetContentContainer(){
		$('div#contentContainer').html("");
	}


	// On FExplorer's load
	getNewFiles();

});