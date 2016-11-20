#About
js-cgdk - is a javascript language package for Russia Ai Code Cup 2016.
You can read about contest here http://russianaicup.ru/

#How to use
1. Download js-cgdk folder to any where on your computer.
2. Download debug tool 'localRunner' here: http://russianaicup.ru/p/localrunner
3. Install nodejs runtime 6.9.1 https://nodejs.org/en/

4. Edit 'move' function in '/my-strategy.js' file as you want to tur it in to powerful AI.
5. Launch localRunner by double click on local-runner-sync.bat
6. Launch your strategy by double click on run.bat file.
7. If everything ok, upload your '/my-strategy.js' file here http://russianaicup.ru/submit

#Pull requests and issues
I had only a couple of days to make this package, please be patient with any errors you'll found.
Please use this page to report about any mistakes: https://github.com/Megabyteceer/js-cgdk/issues

#launch arguments
```bash
nodejs runner.js hostname[default:"127.0.0.1"] port[default:"31001"] auth_id[default:"0000000000000000"] path-to-strategy[default:"./my-strategy.js"]
```

#how to debug
You can start you strategy in browser with dew-tools you prefer:

1. launch `install-visual-debugger.bat` to download modules;
2. start localRunner;
3. launch `debug-visual.bat`;
New page should be opened and draw battle. You can open dev-tools (press F-12) and break/debug you strategy source file.
To customize drawing edit file `test/public/js/draw-utils.js`

#License
MIT
