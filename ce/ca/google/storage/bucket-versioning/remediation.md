# Remediation

## Enable Object Versioning

### **From gcloud CLI**

To enable versioning finding, use the `--versioning` flag:

    ```sh
    gcloud storage buckets update gs://{{bucket-name}} --versioning
    ```
