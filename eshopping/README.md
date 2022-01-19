## Starting Repo for MERN Stack - The Complete Guide
npm install
npm run dev

## Stripe Testing
No authentication (default U.S. card): 4242 4242 4242 4242.
Authentication required: 4000 0027 6000 3184.

## Dockerization

docker build .
<error>: "No docker file"
docker build -f Dockerfile.dev .

docker run -it -p 3000:3000 <IMAGE_ID> 
docker run -it -e PORT=3030 -p 3030:3030 bhadrastores
#sha256:9a5163c6eeacc7899cd71a755431ecb507b89290a7bf8eee9a324358833f9837
docker run -it -p 3000:3000 <IMAGE_ID> -v /app/node_modules -v $(pwd):/app
docker run -it -p 3000:3000 -v /app/node_modules -v ${PWD}:/app -e CHOKIDAR_USEPOLLING=true IMAGE_ID
docker run -it -p 3000:3000 -v /app/node_modules -v ${PWD}:/app -e CHOKIDAR_USEPOLLING=true sha256:9a5163c6eeacc7899c
docker exec -it 716a3de65e1b sh
docker-compose up
docker-compose down

docker run -it <CONT_ID> npm run test
docker run -it sha256:c520ec75ceacf811d4c6d105f50 npm run test

heroku container:push web --app bhadrastores
docker build -f Dockerfile.dev -t bhadrastores:latest .
docker tag bhadrastores:latest registry.heroku.com/bhadrastores/web
docker push registry.heroku.com/bhadrastores/web
heroku container:release web --app bhadrastores
