# Kitchen 2.0

Kitchen 2.0 is a Full Stack Application, which is used to create recipes & a shopping cart for buying ingredients.

![Design](https://github.com/rajeshradhakrishnanmvk/kitchen2.0/blob/59b0ddccbe6812503545263beb086392af62afc6/docs/Kitchen2.0.png)

# Courses

These are the courses I have completed in order to complete this project, goal is to enhance is further with new ideas.

[1. Angular - The Complete Guide (2021 Edition)](https://www.udemy.com/share/101WAU3@g2cxBMgLyAy6gcAEbpK9QsSOJlkdApDfsWVuWAMr-oZiZ_U9NXCQ3RFjYMZa5fflBw==/)


[2. Docker and Kubernetes: The Complete Guide](https://www.udemy.com/share/101WRe3@Jdm17x98hGtEJaKeHYMOeAQsonZm36VkxdQbsPOyW5qjNFm4V7eigsskpqsROvtaZw==/)


[3. TensorFlow Developer Certificate in 2021: Zero to Mastery](https://www.udemy.com/share/104sRw3@cxCGAeSCufyt3H5Erhhr_TXmfjXHJGDlytcmZCb5vsuE0UXKnwSTevbYN06PFwfWUQ==/)


[4. MERN Stack - The Complete Guide](https://www.udemy.com/share/101XNI3@tRgRIzk1bWvXtrAvdD6ujc4ylBecRiNu-qMwdCK4zBXRrOGNgM8NKTFtA_r_fGBJKg==/)

# Git Repo

Configure the report and get the source code
```
git remote -v
git remote add origin https://github.com/rajeshradhakrishnanmvk/kitchen2.0.git
git pull origin master
git add .
git status
```
# Folder Structure

1. Kitche 2.0 App

    a. backend

    b. recipe

    c. docs

    d. k8s
    
    ReadMe.md

# Angular Setup

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
ng new recipe
cd recipe
ng serve --open
ng test

# dotnet core

Install dotnet core framework

```
mkdir kitchen2.0

cd kitchen2.0
dotnet new web
dotnet build
dotnet test
```

Reference:

https://docs.microsoft.com/en-us/dotnet/fundamentals/


# Bootstrap

```
npm install --save bootstrap@3
```

Reference : 

[Bootstrap Issue 1](https://stackoverflow.com/questions/51870386/bootstrap-not-working-in-angular-6-app)


[Bootstrap Issue 2](https://stackoverflow.com/questions/52676474/bootstrap-not-working-properly-in-angular-6/52676543)


[Bootstrap Issue 3](https://stackoverflow.com/questions/45646101/bootstrap4-dependency-popperjs-throws-error-on-angular)


[Bootstrap Issue 4:](https://www.positronx.io/setup-angular-6-project-using-bootstrap-4-sass-font-awesome-ng-bootstrap/)

# Docker 


Prerequisites:


Step 0. [Enable WSL2 in Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-manual)


Step 1. Install docker in WSL2 mode

Step 2. Run MSSQL image 

```
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-CU8-ubuntu
```

Step 3. Run MongoDB image 

**Syntax**

docker run -it --network some-network --rm mongo mongo --host some-mongo test

```
docker run --rm -d -p 27017:27017 -v /home/rajesh/recipe:/data/db mongo 
```

Step 3. Build  Kitchen 2.0 dependent images
```
docker build -t backend .
docker build -t recipe .
```

Step 3. Test Run Kitchen 2.0 images

```
docker run --rm -d -p 8081:80  backend -e "PORT=80"
docker run --rm -d -p 4200:80  recipe 
docker-compose build web0 web1
docker-compose up
```

Step 4. Access our application using http://localhost:4200

Step 5. Push Kitchen 2.0 images to docker hub

**Syntax:**

*Tag the image*

docker tag local-image:tagname new-repo:tagname

*Push the image*

docker push new-repo:tagname

```
docker tag recipe:latest <yourdockerid>/recipe:v.1.0
docker push <yourdockerid>/recipe:v.1.0
```


# Kubernetes - k3d/k3s cluster setup

Step 1: Get the k3d binary and install in WSL2/Ubuntu 

```
wget -q -O - https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash

```

Step 2: Create the k3s cluster 

**Examples** 

*k3d cluster create mycluster --api-port 127.0.0.1:6445 --servers 3 --agents 2 --volume '/mnt/c/kitchen2.0/:/code@agent[*]' --port '8080:80@loadbalancer'*

*k3d cluster create elite-dev --port 8080:80@loadbalancer --port 8443:443@loadbalancer --image rancher/k3s:v1.21.0-k3s1 *

```
k3d cluster create v121-dev --port 8080:80@loadbalancer --port 8443:443@loadbalancer --image rancher/k3s:v1.21.0-k3s1

k3d cluster list
```

Step 3: Install kubectl 

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

```

Step 4: Configure kubectl 

config files will be at path "/home/$USER/.kube/config"

```
kubectl config view
kubectl config get-clusters
kubectl config get-contexts
kubectl config set-context elite-dev
```

Step 4: Build kitchen 2.0 images into the cluster.
```
cd /mnt/c/kitchen2.0
```
**Build the image**
```
cd backend
docker build -f Dockerfile.k3d -t backend .
cd recipe
docker build -f Dockerfile.k3d -t recipe .
```
**Tag the image**

```
docker tag recipe:latest <yourdockerid>/recipe:v.1.0
```
**Import the image into the k3s cluster**

```
k3d image import <yourdockerid>/recipe:v.1.0 -c elite-dev
```

Step 4: Build & Deploy Database images into the cluster.

```
docker tag backend:latest <yourdockerid>/backend:v.1.0

k3d image import <yourdockerid>/backend:v.1.0 -c elite-dev

docker tag mcr.microsoft.com/mssql/server:2017-CU8-ubuntu mssql:v.1.0

k3d image import mssql:v.1.0 -c elite-dev

docker tag mongo:latest mongo:v.1.0

k3d image import mongo:v.1.0 -c elite-dev

```
Step 5: Build kitchen 2.0 images into the cluster.

**Single POD deployment**
```
cd /mnt/c/kitchen2.0/k8s

kubectl apply -f ./k8s/client-pod.yaml
kubectl apply -f ./k8s/clien-node-port.yaml
```

**Multiple container deployment**

```
kubectl apply -f k8s/multi
```

Step 5: A few kubectl commands to navigate the cluster.

```
kubectl get pod --all-namespaces --output wide

kubectl get pods

kubectl delete pod client-pod

watch kubectl get pods -o wide

kubectl get storageclass

kubectl get pv

kubectl exec -it mongo-deployment-69686f8bf7-pb4xw sh
```


Step 6: Access Kitchen 2.0 frontend

 http://recipe.k3d.localhost:8080/

Step 7: Access Kitchen 2.0 backend


http://backend.k3d.localhost:8080/swagger


Reference:

https://www.suse.com/c/introduction-k3d-run-k3s-docker-src/
https://en.sokube.ch/post/k3s-k3d-k8s-a-new-perfect-match-for-dev-and-test-1
https://qiita.com/dennistanaka/items/78585b6bda374be98aad

# Recipe

### TBD



# Swagger Test

To unit test using swagger access kitchen2.0 backend : http://backend.k3d.localhost:8080/swagger

## Login Data

{
  "userId": "r@gmail.com",
  "password": "123456",
  "email": "r@gmail.com",
  "firstName": "rajesh",
  "lastName": "radhakrishnan",
  "role": "admin",
  "addedDate": "2021-09-15T15:24:24.852Z"
}

## Add Recipe Data

{
  "userId": "r@gmail.com",
  "recipes": [
    {
      "id": 0,
      "name": "Big Fat Burger!",
      "description": "Test BurGer King",
      "imagePath": "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      "ingredients": [
        {
          "id": 0,
          "name": "Cheese",
          "amount": 10,
          "createdBy": "Rajesh",
          "creationDate": "2021-10-05T10:26:08.658Z"
        }
      ],
      "createdBy": "Rajesh",
      "creationDate": "2021-10-05T10:26:08.658Z"
    }
  ]
}

```
curl -X POST "http://localhost:8081/api/Recipes/1001" -H  "accept: */*" -H  "Content-Type: application/json" -d "{\"id\":0,\"name\":\"Test\",\"description\":\"Test Recipe\",\"imagePath\":\"//image//test\",\"ingredient\":[{\"id\":0,\"name\":\"Cheese\",\"amount\":10,\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}],\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}"
```

## Web Components

### [Co-exist Angular & React](https://nx.dev/l/a/examples/react-and-angular)


## MicroK8s (Opional for kubeflow)

```
# Check all services that are running
microk8s.kubectl get all --all-namespaces

# Check the services enabled on the cluster
microk8s.kubectl cluster-info
```

```
microk8s.kubectl get all --all-namespaces
```

Reference

[WSL2+Microk8s](https://wsl.dev/wsl2-microk8s/)

## Ideas

https://dotnetthoughts.net/upload-files-dot-net-core-angular/

https://www.learmoreseekmore.com/2020/11/dotnetcore-api-redis-cache.html


https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15

https://www.mongodb.com/try/download/compass


https://docs.microsoft.com/en-us/sql/tools/visual-studio-code/sql-server-develop-use-vscode?view=sql-server-ver15

https://www.thecodebuzz.com/jwt-authorization-token-swagger-open-api-asp-net-core

https://www.c-sharpcorner.com/article/authentication-and-authorization-in-asp-net-5-with-jwt-and-swagger/
