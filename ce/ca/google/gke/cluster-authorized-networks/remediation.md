# Remediation

## Enable Control Plane Authorized Networks

### **Using gcloud CLI**

To enable Control Plane Authorized Networks for an existing cluster, run the following command:

    ```sh
    gcloud container clusters update <cluster_name> \
        --location {{location}} \
        --enable-master-authorized-networks
    ```

You can also specify the allowed IP ranges using the `--master-authorized-networks` flag. This flag accepts a comma-separated list of CIDR blocks (up to 100 for private clusters, 50 for public clusters).

These authorized networks define the IP addresses permitted to access your cluster’s control plane via HTTPS.
