terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# DynamoDB Table named tasks-table
resource "aws_dynamodb_table" "tasks" {
  name           = var.dynamodb_table_name
  billing_mode   = "PROVISIONED"
  hash_key       = "id"
  read_capacity  = 5
  write_capacity = 5

  attribute {
    name = "id"
    type = "S"
  }
}

# S3 Bucket for file storage
resource "aws_s3_bucket" "task-manager-api-files" {
  bucket = var.bucket_name
}

# Elastic Beanstalk Application
# resource "aws_elastic_beanstalk_application" "my_app" {
#   name        = "my-app"
#   description = "Elastic Beanstalk Application for MyApp"
# }

# Elastic Beanstalk Environment
# resource "aws_iam_role" "role-elb" {
#   name = "role-elb-role"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Principal = {
#           Service = "ec2.amazonaws.com"
#         }
#         Action = "sts:AssumeRole"
#       }
#     ]
#   })
# }

# resource "aws_iam_instance_profile" "tf-ellb" {
#   name = "role-elb-role"
#   role = aws_iam_role.role-elb-role.name
# }

# resource "aws_elastic_beanstalk_application" "task_manager_app" {
#   name = "task_manager_app"
# }

# resource "aws_elastic_beanstalk_environment" "task_manager_env" {
#   name                = "task-manager-env"
#   application         = aws_elastic_beanstalk_application.task_manager_app.name
#   solution_stack_name = "64bit Amazon Linux 2023 v6.4.3 running Node.js 22"

#   setting {
#     namespace = "aws:autoscaling:asg"
#     name      = "MinSize"
#     value     = "1"
#   }
#   setting {
#     namespace = "aws:autoscaling:asg"
#     name      = "MaxSize"
#     value     = "3"
#   }
#   setting {
#     namespace = "aws:elasticbeanstalk:application:environment"
#     name      = "DB_TABLE_NAME"
#     value     = aws_dynamodb_table.tasks.name
#   }
# }

# Outputs
# output "elastic_beanstalk_url" {
#   value = aws_elastic_beanstalk_environment.task_manager_env.endpoint_url
# }

output "dynamodb_table_name" {
  value = aws_dynamodb_table.tasks.name
}
