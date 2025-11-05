# Remediation

Alias IPs cannot be enabled on an existing cluster. To use Alias IPs, you must create a new cluster with the feature enabled.

## Create a New Cluster with Alias IPs Enabled

### **From gcloud CLI**

1. **Run the following command to create a new GKE cluster with the `--enable-ip-alias` flag**

    ```sh
    gcloud container clusters create {{new-cluster-name}} \
        --location {{location}} \
        --enable-ip-alias
    ```

    Adjust other flags (e.g., region, node pool size, network settings) to match your workload requirements.

2. **Migrate workloads to the new cluster**

    Reconfigure your deployments and services to target the newly created cluster. Update your `kubeconfig` to point to the new cluster.

3. **Validate workloads and configurations**

    - Ensure applications are running as expected in the new cluster.
    - Confirm monitoring, logging, and networking rules are correctly applied.
    - Perform backups of workloads and configurations before decommissioning the old cluster.

4. **Delete the old cluster**

    Once workloads have been fully migrated and validated, delete the old cluster:

    ```sh
    gcloud container clusters delete {{old-cluster-name}} \
        --location {{location}}
    ```
