# Varahi Jewels — DevOps Pipeline Project

A full-stack luxury jewellery e-commerce platform built with **Next.js** and **PostgreSQL**, deployed through a complete, production-style DevOps pipeline: containerization, infrastructure as code, Kubernetes orchestration, CI/CD automation, monitoring, and security scanning — all running on AWS.

This project was built to demonstrate end-to-end DevOps practices: from local development through to an automated, observable, cloud-native deployment.

---

## Tech Stack

**Application**
- Next.js 16 (App Router, TypeScript)
- PostgreSQL 16

**DevOps / Infrastructure**
- Docker & Docker Compose — local multi-container development
- Terraform — AWS infrastructure as code
- AWS (EC2, VPC, ECR, IAM, Security Groups)
- Kubernetes (k3s) — container orchestration
- Jenkins — CI/CD pipeline automation
- Prometheus & Grafana — monitoring, dashboards, alerting
- Trivy — container image vulnerability scanning

---

## Architecture Overview

```
Developer Push (GitHub)
        │
        ▼
  GitHub Webhook
        │
        ▼
   ┌─────────┐      build      ┌─────────┐      push      ┌─────────┐
   │ Jenkins │ ───────────────▶│  Docker │ ───────────────▶│   ECR   │
   │  (CI/CD)│                 │  Image  │                 │(Registry)│
   └─────────┘                 └─────────┘                 └─────────┘
        │                                                        │
        │ security scan (Trivy)                                 │
        ▼                                                        ▼
   ┌─────────────────────────────────────────────────────────────────┐
   │                     Kubernetes Cluster (k3s on EC2)              │
   │                                                                    │
   │   ┌────────────────┐        ┌────────────────┐                  │
   │   │  varahi-app     │◀──────▶│   postgres      │                  │
   │   │  (Next.js)      │        │  (Database)     │                  │
   │   └────────────────┘        └────────────────┘                  │
   │                                                                    │
   └─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                  Prometheus + Grafana
                (metrics, dashboards, alerts)
```

All infrastructure — VPC, subnet, security groups, EC2 instance, and the ECR repository — is provisioned via **Terraform**, making the entire environment reproducible from code.

---

## Features

### Application
- Curated product catalog with categories (necklaces, rings, earrings, bracelets, tiaras)
- Admin dashboard for managing inventory and catalogs
- Contact form
- Responsive design with theme support
- PostgreSQL-backed persistence (migrated from an earlier SQLite prototype)

### DevOps Pipeline
- **Multi-container local development** via Docker Compose (app + Postgres)
- **Infrastructure as Code** — full AWS environment (VPC, subnets, security groups, EC2, ECR) provisioned and reproducible via Terraform
- **Container orchestration** — app and database run as separate Kubernetes Deployments and Services on a self-managed k3s cluster
- **Private registry authentication** — Kubernetes pulls images from a private ECR repository using a Kubernetes Secret for auth
- **Automated CI/CD** — every push to `main` triggers a GitHub webhook, which kicks off a Jenkins pipeline that:
  1. Checks out the latest code
  2. Builds a new Docker image
  3. Scans the image for vulnerabilities with Trivy
  4. Pushes the image to ECR (tagged with both the build number and `latest`)
  5. Performs a rolling update of the Kubernetes deployment — zero downtime
- **Observability** — Prometheus scrapes cluster and application metrics; Grafana visualizes them via pre-built dashboards, with a configured alert rule (CPU threshold) demonstrating basic alerting practice

---

## CI/CD Pipeline

Defined in [`Jenkinsfile`](./Jenkinsfile) as pipeline-as-code. Stages:

| Stage | What it does |
|---|---|
| Checkout | Pulls the latest commit from GitHub |
| Build Docker Image | Builds the app image, tagged with the Jenkins build number and `latest` |
| Security Scan | Runs Trivy against the built image, reporting HIGH/CRITICAL CVEs |
| Login to ECR | Authenticates Docker with AWS ECR using stored Jenkins credentials |
| Push Image to ECR | Pushes both tags to the private registry |
| Deploy to Kubernetes | Runs `kubectl set image` to trigger a rolling update on the live deployment |

Triggered automatically via a GitHub webhook on every push to `main` — no manual intervention required.

---

## Infrastructure as Code

All AWS infrastructure lives in [`terraform/`](./terraform):

- `main.tf` — VPC, subnet, internet gateway, route table, security group, ECR repository, EC2 instance, SSH key pair
- `variables.tf` — configurable inputs (region, instance type, storage size, allowed SSH IP)
- `outputs.tf` — exposes the EC2 public IP and ECR repository URL after apply

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

---

## Kubernetes Manifests

Located in [`k8s/`](./k8s):

- `postgres-deployment.yaml` — Postgres Deployment + Service (ClusterIP)
- `app-deployment.yaml` — Application Deployment + Service (NodePort), including `imagePullSecrets` for private ECR authentication

```bash
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/app-deployment.yaml
kubectl get pods
```

---

## Monitoring

Installed via the `kube-prometheus-stack` Helm chart, which bundles Prometheus, Grafana, and Alertmanager.

- **Prometheus** scrapes cluster-wide metrics (CPU, memory, network, pod health)
- **Grafana** visualizes them through pre-built Kubernetes dashboards
- A **CPU-threshold alert rule** is configured to demonstrate basic alerting practice

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```

---

## Security

- Docker images are scanned with **Trivy** as a pipeline stage before deployment, surfacing known CVEs by severity
- Kubernetes pulls from a **private** ECR repository, authenticated via a Kubernetes Secret (`imagePullSecrets`) rather than public/anonymous access
- SSH access to the EC2 instance is restricted to a single IP via the Terraform-managed security group, rather than open to `0.0.0.0/0`
- Secrets (`.env.local`, SSH private keys, Terraform state) are excluded from version control via `.gitignore`

> **Note on IAM:** for the scope of this personal/learning project, the AWS IAM user uses `AdministratorAccess` for simplicity. In a production environment, this would be scoped down to a least-privilege policy limited to exactly the actions Terraform needs (EC2, VPC, ECR, IAM:PassRole) rather than full administrative access.

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/SumeetRawal5588/Jewellery_website.git
cd Jewellery_website

# Copy environment template and fill in real values
cp .env.example .env.local

# Run the full stack locally
docker compose up --build -d
```

App available at `http://localhost:3000`.

---

## Project Structure

```
.
├── src/                      # Next.js application source
├── public/                   # Static assets
├── terraform/                # AWS infrastructure as code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── k8s/                       # Kubernetes manifests
│   ├── app-deployment.yaml
│   └── postgres-deployment.yaml
├── Dockerfile                 # Multi-stage production build
├── docker-compose.yml         # Local multi-container dev environment
├── Jenkinsfile                 # CI/CD pipeline definition
└── README.md
```

---

## What This Project Demonstrates

- Provisioning and managing cloud infrastructure with Terraform (Infrastructure as Code)
- Containerizing a multi-service application with Docker and Docker Compose
- Deploying and managing workloads on Kubernetes, including private registry auth and rolling updates
- Building a fully automated CI/CD pipeline with Jenkins, triggered by GitHub webhooks
- Integrating security scanning into a deployment pipeline
- Setting up monitoring, dashboards, and alerting with Prometheus and Grafana
- Diagnosing and resolving real infrastructure issues (networking, permissions, container-to-host communication) encountered while building the system

---

## Author

Built by Sumeet Rawal as a hands-on DevOps learning project, covering the full lifecycle from local development to an automated, observable, cloud-native deployment.
