# Remediation

To ensure visibility into cluster performance, uptime, and overall health, Cloud Monitoring should be enabled for GKE clusters.

## Enable Cloud Monitoring on an Existing Cluster

### **From gcloud CLI**

    ```sh
    gcloud container clusters update {{cluster-name}} \
        --location {{location}} \
        --monitoring=SYSTEM,API_SERVER,POD
    ```
