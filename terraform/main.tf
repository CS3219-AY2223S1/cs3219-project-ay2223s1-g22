# Filename: main.tf

# Configure GCP project
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  credentials = file("./gcp-service-account-keys.json")
  project     = "cs3219-project-ay2223s1-g22"
  region      = "asia-southeast1"
  zone        = "asia-southeast1-a"
}

# Deploy image to Cloud Run
resource "google_cloud_run_service" "matching-service" {
  name     = "matching-service"
  location = "asia-southeast1"
  template {
    spec {
      containers {
        image = "gcr.io/cs3219-project-ay2223s1-g22/matching-service"
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Create public access
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

# Enable public access on Cloud Run service
resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.matching-service.location
  project     = google_cloud_run_service.matching-service.project
  service     = google_cloud_run_service.matching-service.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

# Return service URL
output "url" {
  value = google_cloud_run_service.matching-service.status[0].url
}