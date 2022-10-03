👋 Hello! Welcome to our repo!

- 🎉 Try our app [here](https://frontend-pzsuad4zva-as.a.run.app/login)
- 📝 Check out our [project report](https://cs3219-ay2223s1.github.io/cs3219-project-ay2223s1-g22/)
- 👀 See our [progress](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?sortedBy%5Bdirection%5D=asc&sortedBy%5BcolumnId%5D=14488831&visibleFields=%5B14488831%2C%22Title%22%2C%22Assignees%22%2C%22Status%22%5D)

# For developers

## Set up

To set up the environment for local development, run the following command:

1. Ensure that the Docker desktop application is running
2. With the cloned repo as the current working directory, enter the following commands in the terminal:

```bash
docker-compose up --build -d

cd frontend
npm run start
```

## Tear down

1. With `/frontend` as the current working directory, press the keys: `CTRL` + `C`
2. Enter the following commands in the terminal:

```bash
cd ..
docker-compose down
```
