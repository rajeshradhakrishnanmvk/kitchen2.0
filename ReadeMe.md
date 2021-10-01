# Smart Recon App

    The application is used to reconclie two data list 

## Git Repo

```
git remote -v
git remote add origin https://ExperionInternal@dev.azure.com/ExperionInternal/Smart%20Recon%20App/_git/Smart%20Recon%20App
git pull origin master
git add .
git status
```
## Folder Structure

1. Smart Recon App

    a. docs

    b. smartrecon

    c. ui
    
    ReadeMe.md

## Angular Setup

[Install Node](https://nodejs.org/en/download/current/)

[Install Angular](https://angular.io/guide/setup-local)

```
npm install -g @angular/cli
```
npm --version 7.21.1

Angular CLI: 12.2.4

Node: 16.9.0 (Unsupported)

Package Manager: npm 7.21.1

OS: win32 x64
```
set-ExecutionPolicy RemoteSigned -Scope CurrentUser 
```
ng new ui
cd ui
ng serve --open
ng test

## dotnet core

Install dotnet core framework

```
mkdir smartrecon

cd smartrecon
dotnet new web
dotnet build
dotnet test
```

## Angular Material

```
ng add @angular/material
```

## Bootstrp

```
npm install --save bootstrap@3
```
# Kubernetes Setup

Reference : 
[WSL2+Microk8s](https://wsl.dev/wsl2-microk8s/)
[Bootstrap Issue 1:](https://stackoverflow.com/questions/51870386/bootstrap-not-working-in-angular-6-app)
[Bootstrap Issue 2:](https://stackoverflow.com/questions/52676474/bootstrap-not-working-properly-in-angular-6/52676543)
[Bootstrap Issue 3:](https://stackoverflow.com/questions/45646101/bootstrap4-dependency-popperjs-throws-error-on-angular)
[Bootstrap Issue 4:](https://www.positronx.io/setup-angular-6-project-using-bootstrap-4-sass-font-awesome-ng-bootstrap/)

```
# Check all services that are running
microk8s.kubectl get all --all-namespaces
# Check the services enabled on the cluster
microk8s.kubectl cluster-info
```

```
microk8s.kubectl get all --all-namespaces
```

/mnt/c/myWork/SmartReconApp/k8s


https://docs.microsoft.com/en-us/dotnet/fundamentals/

https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15
https://www.mongodb.com/try/download/compass
https://hub.docker.com/_/mongo-express

https://docs.microsoft.com/en-us/sql/tools/visual-studio-code/sql-server-develop-use-vscode?view=sql-server-ver15

https://www.thecodebuzz.com/jwt-authorization-token-swagger-open-api-asp-net-core
https://www.c-sharpcorner.com/article/authentication-and-authorization-in-asp-net-5-with-jwt-and-swagger/

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-CU8-ubuntu


docker run -it --network some-network --rm mongo mongo --host some-mongo test

docker run --rm -d -p 27017:27017 -v /home/rajesh/recipe:/data/db mongo 

{
  "userId": "1001",
  "password": "123456",
  "email": "r@gmail.com",
  "firstName": "rajesh",
  "lastName": "radhakrishnan",
  "role": "admin",
  "addedDate": "2021-09-15T15:24:24.852Z"
}

curl -X POST "http://localhost:8081/api/Recipes/1001" -H  "accept: */*" -H  "Content-Type: application/json" -d "{\"id\":0,\"name\":\"Test\",\"description\":\"Test Recipe\",\"imagePath\":\"//image//test\",\"ingredient\":[{\"id\":0,\"name\":\"Cheese\",\"amount\":10,\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}],\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}"

{
  "id": 0,
  "name": "Test",
  "description": "Test Recipe",
  "imagePath": "//image//test",
  "ingredient": [
    {
      "id": 0,
      "name": "Cheese",
      "amount": 10,
      "createdBy": "Rajesh",
      "creationDate": "2021-09-16T05:06:10.078Z"
    }
  ],
  "createdBy": "Rajesh",
  "creationDate": "2021-09-16T05:06:10.078Z"
}


## Docker

docker build -t backend .
docker build -f Dockerfile.k3d -t backend .

docker build -t recipe .
docker build -f Dockerfile.k3d -t recipe .

docker run --rm -d -p 8081:80  backend -e "PORT=80"
docker run --rm -d -p 4200:80  recipe 
docker-compose build web0 web1
docker-compose up


docker tag local-image:tagname new-repo:tagname
docker push new-repo:tagname

docker tag recipe:latest 15091983/recipe:v.1.0
docker push 15091983/recipe:v.1.0

## Kubernetes Setup

https://www.suse.com/c/introduction-k3d-run-k3s-docker-src/
https://en.sokube.ch/post/k3s-k3d-k8s-a-new-perfect-match-for-dev-and-test-1

wget -q -O - https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"


sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl


k3d cluster create v121-dev --port 8080:80@loadbalancer --port 8443:443@loadbalancer --image rancher/k3s:v1.21.0-k3s1

k3d cluster create elite-dev --port 8080:80@loadbalancer --port 8443:443@loadbalancer --image rancher/k3s:v1.21.0-k3s1

k3d cluster create mycluster --api-port 127.0.0.1:6445 --servers 3 --agents 2 --volume '/mnt/c/myWork/SmartReconApp:/code@agent[*]' --port '8080:80@loadbalancer'

kubectl get pod --all-namespaces --output wide

config files will be at path "/home/rajesh/.kube/config"
kubectl config view
kubectl config get-clusters
kubectl config get-contexts

cd /mnt/c/myWork/SmartReconApp

kubectl apply -f ./k8s/client-pod.yaml
kubectl apply -f ./k8s/clien-node-port.yaml

kubectl get pods

k3d cluster list

docker tag recipe:latest 15091983/recipe:v.1.0
k3d image import 15091983/recipe:v.1.0 -c elite-dev
docker tag backend:latest 15091983/backend:v.1.0
k3d image import 15091983/backend:v.1.0 -c elite-dev
docker tag mcr.microsoft.com/mssql/server:2017-CU8-ubuntu mssql:v.1.0
k3d image import mssql:v.1.0 -c elite-dev
docker tag mongo:latest mongo:v.1.0
k3d image import mongo:v.1.0 -c elite-dev

kubectl delete pod client-pod

watch kubectl get pods -o wide

kubectl get storageclass
kubectl get pv

kubectl apply -f k8s/multi

http://recipe.k3d.localhost:8080/

## Recipe