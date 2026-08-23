variable "aws_region" {
  default = "ap-south-1"
}

variable "project_name" {
  default = "varahi-jewels"
}

variable "instance_type" {
  default = "m7i-flex.large"
}

variable "volume_size" {
  description = "Root EBS volume size in GB"
  default     = 30
}

variable "my_ip" {
  description = "Your public IP for SSH access, in CIDR format (e.g. 1.2.3.4/32)"
  type        = string
}