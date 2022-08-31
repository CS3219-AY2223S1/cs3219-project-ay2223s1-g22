# Matching Service

## Instructions to run

### Run on local machine

```bash
# Set up
docker build --target dev -t matching-service-dev .

# Start the service
docker run -p 8080:8080 --name matching-service-dev-container -d matching-service-dev

# Clean up
docker stop matching-service-dev-container
docker container rm matching-service-dev-container
```

### Run test cases

```bash
# Set up
docker build --target test -t matching-service-test .

# Run the test cases
docker run --name matching-service-test-container matching-service-test

# Clean up
docker container rm matching-service-test-container
```
