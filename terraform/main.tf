module "frontend" {
  source = "./modules/frontend"

  image_tag = var.frontend_image_tag
}

module "api-gateway" {
  source = "./modules/api-gateway"

  image_tag = var.api-gateway_image_tag
}

module "matching-service" {
  source = "./modules/matching-service"

  image_tag = var.matching-service_image_tag
}

module "user-service" {
  source = "./modules/user-service"

  image_tag = var.user-service_image_tag
}

module "collaboration-service" {
  source = "./modules/collaboration-service"

  image_tag = var.collaboration-service_image_tag
}

module "questions-service" {
  source = "./modules/questions-service"

  image_tag = var.questions-service_image_tag
}