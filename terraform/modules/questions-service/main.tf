variable "image_tag" {
  type=string
  default="latest"
}

resource "google_cloud_run_service" "questions-service" {
  name     = "questions-service"
  location = "asia-southeast1"
  template {
    spec {
      containers {
        image = "gcr.io/cs3219-project-ay2223s1-g22/questions-service:${var.image_tag}"
      }
    }
    metadata {
      annotations = {        
        # minimum number of instances
        "autoscaling.knative.dev/minScale" = 1

        # maximum number of instances
        "autoscaling.knative.dev/maxScale" = 10
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
resource "google_cloud_run_service_iam_policy" "noauth-questions-service" {
  location    = google_cloud_run_service.questions-service.location
  project     = google_cloud_run_service.questions-service.project
  service     = google_cloud_run_service.questions-service.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

# Return service URL
output "questions-service-url" {
  value = google_cloud_run_service.questions-service.status[0].url
}