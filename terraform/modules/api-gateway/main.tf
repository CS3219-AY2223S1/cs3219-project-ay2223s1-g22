variable "image_tag" {
  type=string
  default="latest"
}

resource "google_cloud_run_service" "api-gateway" {
  name     = "api-gateway"
  location = "asia-southeast1"
  template {
    spec {
      containers {
        image = "gcr.io/cs3219-project-ay2223s1-g22/api-gateway:${var.image_tag}"
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
resource "google_cloud_run_service_iam_policy" "noauth-api-gateway" {
  location    = google_cloud_run_service.api-gateway.location
  project     = google_cloud_run_service.api-gateway.project
  service     = google_cloud_run_service.api-gateway.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

# Return service URL
output "api-gateway-url" {
  value = google_cloud_run_service.api-gateway.status[0].url
}