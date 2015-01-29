# phaser-workflow

## Installation

Clone this repository, then run `npm install`. 

## Usage

This repo contains a Makefile and some ready-to-use source files. Here is the list of the make tasks:         
 * `make clean`: delete all the files inside the build directory.   
 * `make copy`: copy all files from the source directory to the build directory
 * `make compress`: compress the build directory in a zip file
 * `make uglify`: minify all the .js files inside the build directory
 * `make serve`: start a live-reloading server inside the source directory
 * `make production`: start a live-reloading server inside the build directory
 * `make deploy`**WIP**: commit the files inside the source directory
 * **`make build`**: Run the clean,copy,uglify,compress tasks. This is also the default task
The `index.html` file automatically fetchs the Phaser lib, so you don't have to do it. It will also look for a `style.css` file (included).
You can modify the source and build directories by modifying the `SRCDIR` and `BUILDDIR` vars in the *Makefile*.

## License

All the code is under the WTFPL (see the LICENSE file).
