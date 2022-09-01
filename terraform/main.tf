module "frontend" {
  source = "./modules/frontend"

  image_tag = var.frontend_image_tag
}

module "matching-service" {
  source = "./modules/matching-service"

  image_tag = var.matching-service_image_tag
}