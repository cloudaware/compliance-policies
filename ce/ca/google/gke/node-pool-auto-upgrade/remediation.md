# Remediation

To ensure GKE cluster nodes remain up-to-date with the latest security patches and features, automatic upgrades should be enabled for node pools.

Before proceeding, confirm with application owners that scheduled upgrades will not disrupt critical workloads.

## Enable Auto-Upgrade on an Existing Node Pool

### **From gcloud CLI**

    ```sh
    gcloud container node-pools update {{node-pool-name}} \
        --cluster {{cluster-name}} \
        --location {{location}} \
        --enable-autoupgrade
    ```
