SRCDIR=src
BUILDDIR=build
GITOPTS=--git-dir=$(SRCDIR)/.git/ --work-tree=$(SRCDIR)
NODEDIR=node_modules/.bin

all: build

init:
	if [ ! -d "$(BUILDDIR)" ]; then mkdir $(BUILDDIR); fi

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
	cd $(SRCDIR) && git $(GITOPTS) add . && git $(GITOPTS) commit -m "$(MSG)"
endif

serve:
	./$(NODEDIR)/browser-sync start --server $(SRCDIR) --files "$(SRCDIR)/*" --port 8000

production:
	./$(NODEDIR)/browser-sync start --server $(BUILDDIR) --files "$(SRCDIR)/*" --port 8000


build: init clean copy uglify compress
