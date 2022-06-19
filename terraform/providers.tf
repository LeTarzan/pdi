terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region              = var.region
  shared_config_files = [var.credential_file]
  profile             = "vscode"
}

resource "aws_key_pair" "key" {
  key_name   = "production_key"
  public_key = file("production_key.pub")
}
