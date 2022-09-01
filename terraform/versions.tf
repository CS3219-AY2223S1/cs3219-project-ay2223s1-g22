terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }

  cloud {
    organization = "cs3219-project-ay2223s1-g22"

    workspaces {
      name = "PeerPrep"
    }
  }
}