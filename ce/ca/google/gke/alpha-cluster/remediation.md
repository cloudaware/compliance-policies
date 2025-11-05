# Remediation

Before proceeding, ensure that the cluster is not actively used for production workloads. Alpha features cannot be disabled on an existing cluster; remediation requires creating a new cluster without alpha features and migrating workloads as needed.

## Create a New Cluster Without Alpha Features

### **From gcloud CLI**

1. **Do not include the `--enable-kubernetes-alpha` flag when creating the cluster**

    ```sh
    gcloud container clusters create {{cluster-name}} \
        --location {{location}} \
        --machine-type {{machine-type}} \
        --num-nodes {{node-count}}
    ```

    Adjust other flags (e.g., region, node pool size, network settings) to match your workload requirements.

2. **Migrate workloads to the new cluster**

    Reconfigure your deployments and services to target the newly created cluster. Update your `kubeconfig` to point to the new cluster.

3. **Validate workloads and configurations**

    - Ensure applications are running as expected in the new cluster.
    - Confirm monitoring, logging, and networking rules are correctly applied.
    - Perform backups of workloads and configurations before decommissioning the old cluster.

4. **Delete the alpha cluster**

    Once workloads have been fully migrated and validated, delete the alpha cluster:

    ```sh
    gcloud container clusters delete {{alpha-cluster-name}} \
        --location {{location}}
    ```
