# Remediation

## From Google Cloud Console

1. Login to the GCP Console and navigate to the Dataproc Cluster page by visiting <https://console.cloud.google.com/dataproc/clusters>.
2. Select the project from the projects dropdown list.
3. On the `Dataproc Cluster` page, click on the `Create Cluster` to create a new cluster with Customer managed encryption keys.
4. On `Create a cluster` page, perform below steps:

    • Inside `Set up cluster` section perform below steps:

        o In the `Name` textbox, provide a name for your cluster.

        o From `Location` select the location in which you want to deploy a cluster.

        o Configure other configurations as per your requirements.

    • Inside `Configure Nodes` and `Customize cluster` section configure the settings as per your requirements.

    • Inside `Manage security` section, perform below steps:

        o From `Encryption`, select `Customer-managed key`.

        o Select a customer-managed key from dropdown list.

        o Ensure that the selected KMS Key have Cloud KMS CryptoKey Encrypter/Decrypter role assign to Dataproc Cluster service account ("serviceAccount:service-<project_number>@compute-system.iam.gserviceaccount.com").

        o Click on `Create` to create a cluster.

    • Once the cluster is created migrate all your workloads from the older cluster to the new cluster and delete the old cluster by performing the below steps:

        o On the `Clusters` page, select the old cluster and click on `Delete cluster`.

        o On the `Confirm deletion` window, click on `Confirm` to delete the cluster.

        o Repeat step above for other Dataproc clusters available in the selected project.

    • Change the project from the project dropdown list and repeat the remediation procedure for other Dataproc clusters available in other projects.

## From Google Cloud CLI

Before creating cluster ensure that the selected KMS Key have Cloud KMS CryptoKey Encrypter/Decrypter role assign to Dataproc Cluster service account ("serviceAccount:service-<project_number>@compute-system.iam.gserviceaccount.com").

Run clusters create command to create new cluster with customer-managed key:

            gcloud dataproc clusters create <cluster_name> --region=us-central1 --gce-pd-kms-key=<key_resource_name>

The above command will create a new cluster in the selected region.

Once the cluster is created migrate all your workloads from the older cluster to the new cluster and Run clusters delete command to delete cluster:

            gcloud dataproc clusters delete <cluster_name> --region=us-central1

Repeat step no. 1 to create a new Dataproc cluster.

Change the project by running the below command and repeat the remediation procedure for other projects:

            gcloud config set project <project_ID>"
