deploy: ;@echo "Building ${PROJECT}....."; 
	cd frontend && yarn install && yarn build 
	cp -a frontend/build/. backend/build
