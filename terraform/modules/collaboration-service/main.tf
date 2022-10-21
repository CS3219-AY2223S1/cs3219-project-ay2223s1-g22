variable "image_tag" {
  type=string
  default="latest"
}

resource "google_cloud_run_service" "collaboration-service" {
  name     = "collaboration-service"
  location = "asia-southeast1"
  template {
    spec {
      containers {
        image = "gcr.io/cs3219-project-ay2223s1-g22/collaboration-service:${var.image_tag}"
      }
    }
    metadata {
      annotations = {        
        # minimum number of instances
        "autoscaling.knative.dev/minScale" = 1

        # maximum number of instances
        "autoscaling.knative.dev/maxScale" = 1
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
resource "google_cloud_run_service_iam_policy" "noauth-collaboration-service" {
  location    = google_cloud_run_service.collaboration-service.location
  project     = google_cloud_run_service.collaboration-service.project
  service     = google_cloud_run_service.collaboration-service.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

# Return service URL
output "collaboration-service-url" {
  value = google_cloud_run_service.collaboration-service.status[0].url
}