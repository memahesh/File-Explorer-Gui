$(document).ready(function(){

	// Gets the path written in the filePath input
	function getPathText(){
		return $('input[name=filePath]').val();
	}

	// Updates the path in the filePath input
	function updatePathText(path){

		// console.log(path+"-update");
		// The 3 updates are necessary. See below link for bug and solution
		// https://www.willis-owen.co.uk/jquery-changing-form-values-not-affecting-the-dom/
		$('input[name=filePath]').attr('value', path);
		$('input[name=filePath]').attr('defaultValue', path);
		$('input[name=filePath]').val(path);
		// console.log(getPathText()+"-afterUpdate");
	}

	// Fetches the new list of files and folders for the new input filePath
	function getNewFiles(filePath){
		eel.getFiles(filePath)(function(ret){
			if(ret[0] == 200){
				updatePathText(ret[1]);
				addFilesToDOM(ret[2]);				
			}else if(ret[0] == 404){
				alert("Path not found. Please check the path again");
			}else if(ret[0] == 401){
				alert("Permission Error: Access is denied. You can not view this folder using this app.");
			}
		});
	}

	// On Input submit, new batch of files are fetched
	$("form#getFilesForm").on("submit", function(e){
		e.preventDefault();
		getNewFiles(getPathText());
	});
	
	// Function to add files to DOM
	function addFilesToDOM(ret){
		resetContentContainer();
		let div = $('div#contentContainer');
		let N = ret.length;
		for(let i=0; i<N; i++){
			div.append(contentDOM(ret[i][0], ret[i][1]));
		}
	}

	// Function to create HTML/DOM of one single element
	function contentDOM(fileName, fileType){
		let container = $('<div>', {class:'col-md-3 file '+fileType});
		let img = $('<img>', {src:'assets/'+fileType+'-icon.png', width:150});
		let p = $('<p>', {class:'text-info text-center fileName'}).text(fileName);
		container.append(img);
		container.append(p);
		if(fileType == 'folder'){
			container.on('click', function(){
				let newWorkingDir = getPathText()+fileName+"\\";
				getNewFiles(newWorkingDir);
			});	
		}else{
			container.on('click', function(){
				alert("Application can not open and traverse files. [Only Folders can be opened]");
			})
		}
		
		return container;
	}

	// Resets/ Empties the HTML in the container before re-filling
	function resetContentContainer(){
		$('div#contentContainer').html("");
	}

	// Function that changes the current directory to parent of 'the current directory'
	function goToParent(){
		let pathList = getPathText().split('\\');
		console.log(pathList);
		if(pathList.length > 1){
			pathList.pop();
			pathList.pop();
			pathList.push("");
		}
		let newFilePath = pathList.join('\\');
		getNewFiles(newFilePath);
	}

	$(".parentDirectory").on("click", function(){
		goToParent();
	});

	// On FExplorer's load
	getNewFiles();

});