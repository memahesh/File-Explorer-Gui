# FExplorer

![FExplorer](front-end/assets/FExplorer-long.PNG)

An attempt at making a generic replica of File Explorer for any Operating System supporting Python.

# Screenshots
![FExplorer screenshot](front-end/assets/screenshot.PNG)

# Features
1. Traverse the file system by clicking on folder contents
2. Traverse the file system by writing the file path
3. Go to parent directory

# Requirements

Python module : ```eel```

# Development Mode
## Install
```pip install -r requirements.txt ```

## Run
```python main.py```


# Packaging

Taken from [here](https://github.com/samuelhwilliams/Eel). Look at the last few sections.

Find the executable [here](FExplorer.exe) for the FileExplorer Application

## Building distributable binary with PyInstaller

1. If you want to package your app into a program that can be run on a computer without a Python interpreter installed, you should use ```PyInstaller```.
2. Configure a virtualenv with desired Python version and minimum necessary Python packages. Install PyInstaller ```pip install PyInstaller```
3. In your app's folder, run ```python -m eel [your_main_script] [your_web_folder]``` (for example, you might run python -m eel hello.py web)
4. This will create a new folder ```dist/```
5. Valid PyInstaller flags can be passed through, such as excluding modules with the flag: --exclude module_name. For example, you might run ```python -m eel file_access.py web --exclude [folder_1] --exclude numpy --exclude [folder_2]```
6. When happy that your app is working correctly, add ```--onefile --noconsole``` flags to build a single executable file
7. Consult the documentation for ```PyInstaller``` for more options.


# Compatibility

 - [x] Windows 
 - [x] Ubuntu

# Todos

 - [x] Packaging the application
 - [x] Beautify the application page
 - [x] Implement Object Oriented Programming in JavaScript
 - [x] Add Images to README.md
 - [x] Fill README.md
 - [x] Add Feature to go to parent directory
 - [ ] Verify on all Operating Systems
 - [x] Make an icon :P
 - [x] Get icons for different types of files
 - [x] List Files from Input Text
 - [x] List Files on clicking icons
