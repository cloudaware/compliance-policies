# Remediation

## From Google Cloud Console

1. Log in to the GCP Console and navigate to the Dataproc Cluster page by visiting <https://console.cloud.google.com/dataproc/clusters>.
2. Select the project from the project dropdown list.
3. On the `Dataproc Cluster` page, click `Create Cluster` to create a new cluster with customer-managed encryption keys.
4. On the `Create a cluster` page, perform the following steps:

    - Inside the `Set up cluster` section, perform the following steps:

        - In the `Name` textbox, provide a name for your cluster.

        - From `Location`, select the location in which you want to deploy a cluster.

        - Configure other settings as per your requirements.

    - Inside the `Configure Nodes` and `Customize cluster` sections, configure the settings as per your requirements.

    - Inside the `Manage security` section, perform the following steps:

        - From `Encryption`, select `Customer-managed key`.

        - Select a customer-managed key from the dropdown list.

        - Ensure that the selected KMS key has the Cloud KMS CryptoKey Encrypter/Decrypter role assigned to the Dataproc Cluster service account ("serviceAccount:service-{{project-number}}@compute-system.iam.gserviceaccount.com").

        - Click `Create` to create the cluster.

    - Once the cluster is created, migrate all workloads from the old cluster to the new cluster and delete the old cluster by performing the following steps:

        - On the `Clusters` page, select the old cluster and click on `Delete cluster`.

        - On the `Confirm deletion` window, click on `Confirm` to delete the cluster.

        - Repeat the above step for other Dataproc clusters available in the selected project.

    - Change the project from the project dropdown list and repeat the remediation procedure for Dataproc clusters in other projects.

## From Google Cloud CLI

Before creating a cluster, ensure that the selected KMS key has the Cloud KMS CryptoKey Encrypter/Decrypter role assigned to the Dataproc Cluster service account ("serviceAccount:service-{{project-number}}@compute-system.iam.gserviceaccount.com").

Run the clusters create command to create a new cluster with a customer-managed key:

```sh
gcloud dataproc clusters create {{cluster-name}} \
    --region=us-central1 \
    --gce-pd-kms-key={{key-resource-name}}
```

The above command will create a new cluster in the selected region.

Once the cluster is created, migrate all workloads from the old cluster to the new cluster and run the clusters delete command to delete the old cluster:

```sh
gcloud dataproc clusters delete {{cluster-name}} \
    --region=us-central1
```

Repeat step 1 to create a new Dataproc cluster.

Change the project by running the following command and repeat the remediation procedure for other projects:

```sh
gcloud config set project {{project-id}}
```
