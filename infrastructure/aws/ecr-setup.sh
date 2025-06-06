#!/bin/bash

# ECR Setup Script for Multi-Tier Application
# This script creates ECR repositories and provides build/push commands

set -e

# Configuration
REGION=${AWS_DEFAULT_REGION:-us-east-1}
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "Setting up ECR repositories in region: $REGION"
echo "Account ID: $ACCOUNT_ID"

# Create ECR repositories
echo "Creating ECR repositories..."

aws ecr create-repository \
    --repository-name ecommerce/frontend \
    --region $REGION \
    --image-scanning-configuration scanOnPush=true || echo "Frontend repository already exists"

aws ecr create-repository \
    --repository-name ecommerce/backend \
    --region $REGION \
    --image-scanning-configuration scanOnPush=true || echo "Backend repository already exists"

echo "ECR repositories created successfully!"

# Get login token
echo "Getting ECR login token..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

echo "ECR setup complete!"
echo ""
echo "To build and push images, run:"
echo ""
echo "# Build images"
echo "docker build -t ecommerce/frontend ./frontend"
echo "docker build -t ecommerce/backend ./backend"
echo ""
echo "# Tag images"
echo "docker tag ecommerce/frontend:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/ecommerce/frontend:latest"
echo "docker tag ecommerce/backend:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/ecommerce/backend:latest"
echo ""
echo "# Push images"
echo "docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/ecommerce/frontend:latest"
echo "docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/ecommerce/backend:latest" 