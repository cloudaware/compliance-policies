# Remediation

To maintain the health and availability of GKE cluster nodes, automatic node repair should be enabled for node pools.

## Enable Auto-Repair on an Existing Node Pool

### **From gcloud CLI**

    ```sh
    gcloud container node-pools update {{node-pool-name}} \
        --cluster {{cluster-name}} \
        --location {{location}} \
        --enable-autorepair
    ```
