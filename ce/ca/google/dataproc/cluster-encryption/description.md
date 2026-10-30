# Description

When you use Dataproc, cluster and job data is stored on Persistent Disks (PDs) associated with the Compute Engine VMs in your cluster and in a Cloud Storage staging bucket. This PD and bucket data is encrypted using a Google-generated data encryption key (DEK) and key encryption key (KEK). The CMEK feature allows you to create, use, and revoke the key encryption key (KEK). Google still controls the data encryption key (DEK).

## Rationale

Cloud services offer the ability to protect data related to those services using encryption keys managed by the customer within Cloud KMS. These encryption keys are called customer-managed encryption keys (CMEK). When you protect data in Google Cloud services with CMEK, the CMEK key is within your control.

## Impact

Using customer-managed keys involves additional overhead for administrators.

## Audit

### From Google Cloud Console

1. Log in to the GCP Console and navigate to the Dataproc Cluster page by visiting <https://console.cloud.google.com/dataproc/clusters>.
2. Select the project from the project dropdown list.
3. On the `Dataproc Clusters` page, select the cluster and click the Name value you want to examine.
4. On the `Details` page, select the `Configurations` tab.
5. On the `Configurations` tab, check the `Encryption type` configuration attribute value. If the value is set to `Google-managed key`, the Dataproc cluster is not encrypted with customer-managed encryption keys.

    Repeat steps 3-5 for other Dataproc clusters available in the selected project.

6. Change the project from the project dropdown list and repeat the audit procedure for other projects.

### From Google Cloud CLI

1. Run clusters list command to list all the Dataproc Clusters available in the region:

    ```sh
    gcloud dataproc clusters list \
        --region='us-central1'
    ```

2. Run clusters describe command to get the key details of the selected cluster:

    ```sh
    gcloud dataproc clusters describe {{cluster-name}} \
        --region=us-central1 \
        --flatten=config.encryptionConfig.gcePdKmsKeyName
    ```

3. If the above command output returns "null", the selected cluster is not encrypted with customer-managed encryption keys.
4. Repeat steps 2-3 for other Dataproc clusters available in the selected region. Change the region by updating --region and repeat step 2 for other clusters available in the project. Change the project by running the below command and repeat the audit procedure for other Dataproc clusters available in other projects:

    ```sh
    gcloud config set project {{project-id}}"
    ```

## References

1. <https://cloud.google.com/docs/security/encryption/default-encryption>
