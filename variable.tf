variable "region" {
  description = "The name of the region"
  type        = string
}

variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "dynamodb_table_name" {
  description = "The name of the dynamodb table"
  type        = string
}
