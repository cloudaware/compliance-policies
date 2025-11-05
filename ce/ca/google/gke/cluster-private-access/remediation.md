# Remediation

To allow GKE cluster nodes to securely access Google APIs and services without exposure to the public internet, Private Google Access must be enabled on the cluster's subnetwork.

## Enable Private Google Access

### **From gcloud CLI**

    ```shell
    gcloud compute networks subnets update {{subnet-name}} \
        --region={{region}}\
        --enable-private-ip-google-access
    ```
