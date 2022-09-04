# Matching Service

## Instructions to run

### Run on local machine

```bash
# Set up
docker build --target dev -t frontend-dev .

# Start the service
docker run -p 3000:3000 --name frontend-dev-container -d frontend-dev

# Clean up
docker stop frontend-dev-container
docker container rm frontend-dev-container
```

### Run test cases

```bash
# Set up
docker build --target test -t frontend-test .

# Run the test cases
docker run --name frontend-test-container frontend-test

# Clean up
docker rm frontend-test-container
```
