# phaser-workflow

## Installation 

Clone this repository, then run `npm install`

## Usage

This repo contains a gulpfile.js and some ready-to-use source files. Here is the list of Gulp Tasks: 
 * `gulp clean`: delete all the files inside the build directory
 * `gulp copy`: copy all the files from the source directory to the build directory
 * `gulp compress`: compress the build directory in a zip file
 * `gulp uglify`: minify all the .js files in the build directory
 * `gulp imagemin`: optimize all the images inside the build/assets directory
 * `gulp serve`: run a live-reloading server inside the source directory
 * `gulp production`: run a live-reloading server inside the build directory
 * **`gulp build`**: Run the clean,copy,compress,uglify,imagemin tasks     
 The `index.html` file automatically fetchs the Phaser lib so you don't have to do it. It will also look for a `style.css` file (included). You can change the build and source directories in the *config.json* file.      
