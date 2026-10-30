# Remediation

## From Google Cloud CLI

1. For PostgreSQL instances, enable IAM database authentication:

    ```sh
    gcloud sql instances patch {{instance-name}} \
        --database-flags=cloudsql.iam_authentication=on
    ```

2. For MySQL instances, enable IAM database authentication:

    ```sh
    gcloud sql instances patch {{instance-name}} \
        --database-flags=cloudsql_iam_authentication=on
    ```

    Note: Setting database flags with `gcloud sql instances patch` can overwrite existing flags. Include all existing database flags that must remain configured.

3. Create IAM-authenticated database users as needed:

    ```sh
    gcloud sql users create {{principal}} \
        --instance={{instance-name}} \
        --type=CLOUD_IAM_USER
    ```

4. Grant required database privileges and Google Cloud IAM roles, including `roles/cloudsql.client` and `roles/cloudsql.instanceUser`, to the connecting principals.
5. Test application and user connections before removing password-based access.
