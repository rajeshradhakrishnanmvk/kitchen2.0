# Kitech 2.0 App
The application is used to reconclie two data list 

![Design](https://github.com/rajeshradhakrishnanmvk/kitchen2.0/blob/feature101-frontend/docs/Kitchen2.0.png)

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

docker run  -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=pass@123" -p 1433:1433 --rm -d mcr.microsoft.com/mssql/server:2017-CU8-ubuntu

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

https://github.com/rajeshradhakrishnanmvk/kitchen2.0.git

https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg
Big Fat Burger!


https://www.youtube.com/watch?v=WDuwqPv4RAc

https://experiontechnologies.sharepoint.com/sites/FSETraining

https://experiontechnologies-my.sharepoint.com/:f:/g/personal/rajesh_radhakrishnan_experionglobal_com/Elc3Us3TFqFLmfYmk0SyADcBSg5K0R7OQpihcPqhYXLGGg

https://forms.office.com/Pages/ResponsePage.aspx?id=Zw7sE8UAxESL21KttKL-rhSIB3HnYnVGrf_b7Y4O1IxUODVLTEw4NlROTkE1UThSOEFCRlYzVDJRUS4u

https://forms.office.com/r/LDjf0aZuPn

https://bitly.com

https://docs.microsoft.com/en-us/dotnet/architecture/microservices/net-core-net-framework-containers/official-net-docker-images


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

***Access Kubernetes API***

kubectl proxy --port=8083 
http://localhost:8083/

http://recipe.k3d.localhost:8080/

## Recipe

# Skooner Setup
docker build -t skooner-raj .
docker tag skooner-raj:latest 15091983/skooner:v.1.0
k3d image import 15091983/skooner:v.1.0 -c elite-dev
kubectl rollout status deploy/skooner --namespace=kube-system
kubectl describe pod skooner --namespace=kube-system
kubectl get svc --namespace=kube-system
kubectl logs deploy/skooner --namespace=kube-system
kubectl apply -f .
http://skooner.k3d.localhost:8080/

## Service Account Token

### Create the service account in the current namespace (we assume default)
kubectl create serviceaccount skooner-sa

### Give that service account root on the cluster
kubectl create clusterrolebinding skooner-sa --clusterrole=cluster-admin --serviceaccount=default:skooner-sa

### Find the secret that was created to hold the token for the SA
kubectl get secrets

### Show the contents of the secret to extract the token
kubectl describe secret skooner-sa-token-xxxxx

## Kasten Setup
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
helm repo add kasten https://charts.kasten.io/
kubectl create namespace kasten-io
--set global.persistence.storageClass=local-path
helm install k10 kasten/k10 --namespace=kasten-io
kubectl --namespace kasten-io port-forward service/gateway 8084:8000

http://127.0.0.1:8084/k10/#/

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

kubectl annotate volumesnapshotclass \

(kubectl get volumesnapshotclass -o=jsonpath='{.items[?(@.metadata.annotations.snapshot\.storage\.kubernetes\.io\/is-default-class=="true")].metadata.name}') \
    k10.kasten.io/is-snapshot-class=true

kubectl get pods --namespace kasten-io --watch

***setup kubeconfig after wsl export to another drive***
k3d kubeconfig merge elite-dev
cp /root/.k3d/kubeconfig-elite-dev.yaml ~/.kube/config


## Korifi setup

k3d cluster create korifi-dev --port 8090:80@loadbalancer --port 8443:443@loadbalancer --image rancher/k3s:v1.21.0-k3s1

kubectl config use-context k3d-korifi-dev
kubectl cluster-info

/root/.k3d/kubeconfig-korifi-dev.yaml
cp /root/.k3d/kubeconfig-elite-dev.yaml ~/.kube/config
k3d kubeconfig merge korifi-dev --kubeconfig-merge-default

### cf install
https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#pkg-linux

sudo apt-get install cf8-cli

https://k3d.io/v5.2.0/usage/registries/
https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
https://github.com/cloudfoundry/korifi/blob/v0.1.0/INSTALL.md#configuration
https://github.com/cloudfoundry/korifi/blob/main/INSTALL.md [main branch]

kubectl label namespaces $ROOT_NAMESPACE pod-security.kubernetes.io/enforce=restricted pod-security.kubernetes.io/warn=restricted

kubectl create rolebinding --namespace=$ROOT_NAMESPACE default-admin-binding --clusterrole=korifi-controllers-admin --user=$ADMIN_USERNAME

kubectl create secret docker-registry image-registry-credentials \
    --docker-username="15091983" \
    --docker-password="Sep15@1983" \
    --docker-server="https://index.docker.io/v1/" \
    --namespace "$ROOT_NAMESPACE"

kubectl create secret docker-registry image-registry-credentials --docker-username="15091983" --docker-password="Sep15@1983" --docker-server="https://index.docker.io/v1/" --namespace "$ROOT_NAMESPACE"

docker build -t korifi-cluster-builder . -f ./kpack-image-builder/Dockerfile
docker tag korifi-cluster-builder 15091983/korifi-cluster-builder
docker push 15091983/korifi-cluster-builder

docker build -t korifi-statefulset-runner . -f ./statefulset-runner/Dockerfile
docker tag korifi-statefulset-runner 15091983/korifi-statefulset-runner
docker push 15091983/korifi-statefulset-runner

docker build -t korifi-controllers . -f ./controllers/Dockerfile
docker tag korifi-controllers 15091983/korifi-controllers
docker push 15091983/korifi-controllers

docker build -t korifi-api . -f ./api/Dockerfile
docker tag korifi-api 15091983/korifi-api
docker push 15091983/korifi-api

korifi.k3d.localhost:8090
export BASE_DOMAIN="korifi.k3d.localhost"

kubectl create ns eirini-controller

helm install eirini-controller https://github.com/cloudfoundry/eirini-controller/releases/download/v0.3.0/eirini-controller-0.3.0.tgz   --set "workloads.default_namespace=cf"   --set "controller.registry_secret_name=image-registry-credentials" -n eirini-controller


k3d cluster create korifi-dev --no-lb --image rancher/k3s:v1.21.0-k3s1

DNS Entries: 
api.korifi.example.org 172.23.0.2
\*.apps.korifi.example.org 172.23.0.2


sed $'s/\r$//' ./deploy-on-kind.sh > ./deploy-on-kind.Unix.sh

## Kind install

curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.14.0/kind-linux-amd64
chmod +x ./kind
mv ./kind /bin/

## GO install

wget https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz
sudo tar -xvf go1.14.2.linux-amd64.tar.gz
sudo mv go /bin

export GOROOT=/bin/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH

## CF

cf api https://api.$BASE_DOMAIN --skip-ssl-validation
cf login # select the $ADMIN_USERNAME entry
cf create-org experion
cf create-space -o experion pes
cf target -o experion
cd cd demo
cf push demo

*Debug*
kubectl logs korifi-api-deployment-698b94c879-j67vk -n korifi-api-system --follow
kubectl logs korifi-controllers-controller-manager-6894ffff47-26g4q -n korifi-controllers-system --follow
kubectl logs korifi-kpack-build-controller-manager-7d557cfccc-z6ql6 -n korifi-kpack-build-system --follow
kubectl logs korifi-statefulset-runner-controller-manager-db767955-6fkcw -n korifi-statefulset-runner-system --follow

ref to upload docker images
https://iximiuz.com/en/posts/kubernetes-kind-load-docker-image/

docker exec -it kind-korifi-dev-control-plane bash
crictl images

kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: skooner-sa-secret
  annotations:
    kubernetes.io/service-account.name: skooner-sa
type: kubernetes.io/service-account-token
EOF
