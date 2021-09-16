# KitchenWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Dockerize recipe
All docker commands should be run within WSL2 and not on Windows.
To open your WSL2 operating system, type wsl in the Windows / Cortana Search Bar and click wsl.
In the WSL2 terminal change into your root user directory by running cd ~
Run explorer.exe . to open up a file browser within WSL2.
Move the frontend project directory into the file browser window
Your project path should now look like this:
/home/USER/frontend
/root/recipe
Using the WSL2 terminal build your Docker image as you typically would:
docker build -f Dockerfile.dev -t USERNAME:frontend .
docker build -f Dockerfile.dev -t root:frontend .
Using the WSL2 terminal, start and run a container. It is very important that you do not use a PWD variable as shown in the lecture video as this will not work. Use the ~ alias for the home directory or type out the full path:
docker run -it -p 3000:3000 -v /app/node_modules -v ~/frontend:/app USERNAME:frontend
or
docker run -it -p 3000:3000 -v /app/node_modules -v /home/USER/frontend:/app USERNAME:frontend
docker run -it -p 3000:4200-v /app/node_modules -v /root/recipe:/app root:frontend
docker run -it -p 3000:80 -v /app/node_modules -v /root/recipe:/app root:frontend

Going forward, all Docker commands and projects should be run within WSL2 and not Windows.
docker run -p 3000:3000 -v $(pwd):/app <imageid>