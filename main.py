import eel
import os

eel.init('front-end')

currPath = os.getcwd()

rootPath = os.path.abspath(os.sep)

@eel.expose
def getCWD():
	return currPath


def fileType(fileName):
	ext = fileName.split('.')

	if len(ext) == 1:
		return 'folder'

	ext = ext[len(ext)-1]
	if ext == 'png' or ext == 'jpg' or ext == 'gif':
		return 'image'
	elif ext == 'pdf':
		return 'pdf'
	else:
		return 'file'

@eel.expose
def getFiles(path):
	
	detailedFilesList = []

	try:
		if not path:
			path = rootPath

		filesList = os.listdir(path)

		for file in filesList:
			temp = []
			temp.append(file)
			temp.append(fileType(file))
			detailedFilesList.append(temp)

		responseCode = 200

	except FileNotFoundError:
		responseCode = 404


	response = [responseCode, path, detailedFilesList]

	return response


eel.start('index.html', size=(1000, 600))
