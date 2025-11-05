# Remediation

To ensure comprehensive logging for troubleshooting, auditing, and security purposes, Cloud Logging should be enabled for GKE clusters.

## Enable Cloud Logging on an Existing Cluster

### **From gcloud CLI**

    ```sh
    gcloud container clusters update {{cluster-name}} \
        --location {{location}} \
        --logging=SYSTEM,WORKLOAD,API_SERVER
    ```
