provider "google" {
  credentials = var.GCP_KEY
  project     = "cs3219-project-ay2223s1-g22"
  region      = "asia-southeast1"
  zone        = "asia-southeast1-a"
}