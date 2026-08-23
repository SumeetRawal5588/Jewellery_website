pipeline {
    agent any

    environment {
        AWS_REGION     = 'ap-south-1'
        ECR_REPO       = '294060270764.dkr.ecr.ap-south-1.amazonaws.com/varahi-jewels-app'
        IMAGE_TAG      = "${env.BUILD_NUMBER}"
        AWS_CREDS      = credentials('aws-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${ECR_REPO}:${IMAGE_TAG} -t ${ECR_REPO}:latest ."
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                    export AWS_ACCESS_KEY_ID=${AWS_CREDS_USR}
                    export AWS_SECRET_ACCESS_KEY=${AWS_CREDS_PSW}
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                """
            }
        }

        stage('Push Image to ECR') {
            steps {
                sh "docker push ${ECR_REPO}:${IMAGE_TAG}"
                sh "docker push ${ECR_REPO}:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    export KUBECONFIG=/var/jenkins_home/.kube/config
                    kubectl set image deployment/varahi-app varahi-app=${ECR_REPO}:${IMAGE_TAG}
                    kubectl rollout status deployment/varahi-app
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully — app deployed to Kubernetes.'
        }
        failure {
            echo 'Pipeline failed — check logs above.'
        }
    }
}
