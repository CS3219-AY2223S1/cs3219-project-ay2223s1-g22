# Matching Service

## Instructions to run

### Run on local machine

```bash
# Set up
docker build --target start -t frontend-start .

# Start the service
docker run -p 3000:3000 --name frontend-start-container -d frontend-start

# Clean up
docker stop frontend-start-container
docker container rm frontend-start-container
```

### Run test cases

```bash
# Set up
docker build --target test -t frontend-test .

# Run the test cases
docker run --name frontend-test-container frontend-test
```
