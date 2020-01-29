import eel
import os

eel.init('front-end')

currPath = os.getcwd()

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
    

	filesList = os.listdir(os.path.join(currPath, path))

	detailedFilesList = []

	for file in filesList:
		temp = []
		temp.append(file)
		temp.append(fileType(file))
		detailedFilesList.append(temp)

	return detailedFilesList


eel.start('index.html', size=(1000, 600))
