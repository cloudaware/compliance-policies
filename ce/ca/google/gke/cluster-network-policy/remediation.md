# Remediation

## From Google Cloud Console

1. Go to Kubernetes GCP Console by visiting <https://console.cloud.google.com/kubernetes/list?>
2. Select Kubernetes clusters for which Network policy is disabled
3. Click on EDIT button and Set `Network policy for master` and `Network policy for nodes` to `Enabled` under Cluster section

## From Google Cloud CLI

To enable Network policy for an existing cluster, run the following command:

    ```sh
        gcloud container clusters update [CLUSTER_NAME] --zone [COMPUTE_ZONE] --enable-network-policy
    ```
