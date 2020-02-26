$(document).ready(function(){


	const pathObject = function(){
	}

	// Gets the path written in the filePath input
	pathObject.prototype.getPathText = function(){
		return $('input[name=filePath]').val();
	};

	// Updates the path in the filePath input
	pathObject.prototype.updatePathText = function(path){
		// console.log(path+"-update");
		// The 3 updates are necessary. See below link for bug and solution
		// https://www.willis-owen.co.uk/jquery-changing-form-values-not-affecting-the-dom/
		$('input[name=filePath]').attr('value', path);
		$('input[name=filePath]').attr('defaultValue', path);
		$('input[name=filePath]').val(path);
		// console.log(getPathText()+"-afterUpdate");
	};

	const contentUpdater = function(){

		this.filePath = new pathObject();

	}

	// Fetches the new list of files and folders for the new input filePath
	contentUpdater.prototype.getNewFiles = function(fP){

		let contentUpd = this;

		eel.getFiles(fP)(function(ret){
			if(ret[0] == 200){
				contentUpd.filePath.updatePathText(ret[1]);
				contentUpd.addFilesToDOM(ret[2]);				
			}else if(ret[0] == 404){
				alert("Path not found. Please check the path again");
			}else if(ret[0] == 401){
				alert("Permission Error: Access is denied. You can not view this folder using this app.");
			}
		});
	};

	// Function to add files to DOM
	contentUpdater.prototype.addFilesToDOM = function(ret){
		this.resetContentContainer();
		let div = $('div#contentContainer');
		let N = ret.length;
		for(let i=0; i<N; i++){
			div.append(this.contentDOM(ret[i][0], ret[i][1]));
		}
	};

	// Resets the content container
	contentUpdater.prototype.resetContentContainer = function(){
		$('div#contentContainer').html("");
	};

	// Function that changes the current directory to parent of 'the current directory'
	contentUpdater.prototype.goToParent = function(){
		let pathList = this.filePath.getPathText().split('/');
		console.log(pathList);
		if(pathList.length > 1){
			pathList.pop();
			pathList.pop();
			pathList.push("");
		}
		let newFilePath = pathList.join('/');
		this.getNewFiles(newFilePath);
	};

	// Function to create HTML/DOM of one single element
	contentUpdater.prototype.contentDOM = function(fileName, fileType){
		let contentUpd = this;
		let container = $('<div>', {class:'col-md-3 file '+fileType});
		let img = $('<img>', {src:'assets/'+fileType+'-icon.png', width:150, class:'mx-auto d-block'});
		let p = $('<p>', {class:'text-info text-center fileName'}).text(fileName);
		container.append(img);
		container.append(p);
		if(fileType == 'folder'){
			container.on('click', function(){
				let newWorkingDir = contentUpd.filePath.getPathText()+fileName+"/";
				contentUpd.getNewFiles(newWorkingDir);
			});	
		}else{
			container.on('click', function(){
				alert("Application can not open and traverse files. [Only Folders can be opened]");
			})
		}
		
		return container;
	};

	var filePath = new pathObject();
	var main = new contentUpdater();

	console.log(filePath.getPathText());


	// On Input submit, new batch of files are fetched
	$("form#getFilesForm").on("submit", function(e){
		e.preventDefault();
		main.getNewFiles(filePath.getPathText());
	});

	// On Click function, reset the file path to parent directory
	$(".parentDirectory").on("click", function(){
		main.goToParent();
	});

	// On FExplorer's load
	main.getNewFiles();

});