### 👋 Hello! Welcome to our repo!

- 🎉 Try our app [here](https://frontend-pzsuad4zva-as.a.run.app/login)
- 📝 Check out our [project report](https://cs3219-ay2223s1.github.io/cs3219-project-ay2223s1-g22/)
- 👀 Follow our [progress](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?sortedBy%5Bdirection%5D=asc&sortedBy%5BcolumnId%5D=14488831&visibleFields=%5B14488831%2C%22Title%22%2C%22Assignees%22%2C%22Status%22%5D)

## Local Deployment

### Set up

To set up the environment for local development, do the following:

1. Ensure that the Docker desktop application is running
2. With the cloned repo as the current working directory, enter the following commands in the terminal:

```bash
# Initialize microservices
docker-compose up --build -d

# Serve frontend
cd frontend
npm i
npm run start
```

3. To access the app, open a browser and navigate to `localhost:3000`

### Tear down

1. To stop serving the frontend, press the keys: `CTRL` + `C`
2. To shut down the microservices, enter the following commands in the terminal:

```bash
cd ..
docker-compose down
```
