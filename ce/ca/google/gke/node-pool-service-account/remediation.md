# Remediation

## Configure GKE Node Pools with a Least-Privilege Service Account

### **From gcloud CLI**

1. **Create a minimally privileged service account**

    ```sh
    gcloud iam service-accounts create {{node-sa-name}} \
        --display-name "GKE Node Service Account"
    ```

2. **Capture the service account email**

    ```sh
    export NODE_SA_EMAIL=$(gcloud iam service-accounts list \
        --format='value(email)' \
        --filter='displayName:GKE Node Service Account')
    ```

3. **Capture the project ID**

    ```sh
    export PROJECT_ID=$(gcloud config get-value project)
    ```

4. **Grant the required roles to the service account**

    ```sh
    gcloud projects add-iam-policy-binding $PROJECT_ID \
        --member serviceAccount:$NODE_SA_EMAIL \
        --role roles/monitoring.metricWriter

    gcloud projects add-iam-policy-binding $PROJECT_ID \
        --member serviceAccount:$NODE_SA_EMAIL \
        --role roles/monitoring.viewer

    gcloud projects add-iam-policy-binding $PROJECT_ID \
        --member serviceAccount:$NODE_SA_EMAIL \
        --role roles/logging.logWriter
    ```

5. **Create a new node pool using the service account**

    ```sh
    gcloud container node-pools create {{node-pool}} \
        --service-account=$NODE_SA_EMAIL \
        --cluster={{cluster-name}} \
        --zone {{compute-zone}}
    ```

**Note:** After creating the new node pool, workloads should be migrated to it. The old node pools configured with the default service account should then be deleted to complete the remediation.
