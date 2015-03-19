SRCDIR=src
BUILDDIR=build
GITOPTS=--git-dir=$(SRCDIR)/.git/ --work-tree=$(SRCDIR)
NODEDIR=node_modules/.bin

all: build

init_build:
	if [ ! -d "$(BUILDDIR)" ]; then mkdir $(BUILDDIR); fi
	if [ "$$(command -v bower)" == "" ]; then sudo npm install -g bower; fi
	if [ ! -d "src/lib" ]; then bower install; fi

fetch_modules:
	if [ ! -d "$(NODEDIR)" ]; then npm install; fi

copy: 
	cp -r $(SRCDIR)/* $(BUILDDIR)

compress: 
	cd $(BUILDDIR) && zip -r game.zip *

uglify: 
	./$(NODEDIR)/uglifyjs $(BUILDDIR)/*.js > $(BUILDDIR)/tmp.js
	mv $(BUILDDIR)/tmp.js $(BUILDDIR)/game.js

clean:
	if [ "$$(ls -A $(BUILDDIR))" ]; then rm -r $(BUILDDIR)/*; fi

deploy: 
ifeq ($(MSG), )
	@echo "Usage: make deploy MSG=<commit name>"
else
	git $(GITOPTS) add .
	git $(GITOPTS) commit -m "$(MSG)"
endif

serve: fetch_modules
	./$(NODEDIR)/browser-sync start --server $(SRCDIR) --files "$(SRCDIR)/*" --port 8000

production: init_build build fetch_modules
	./$(NODEDIR)/browser-sync start --server $(BUILDDIR) --files "$(SRCDIR)/*" --port 8000


build: init_build clean copy uglify compress
