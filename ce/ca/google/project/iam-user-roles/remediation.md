# Remediation

## From Google Cloud Console

1. Go to the IAM page in the GCP Console by visiting: <https://console.cloud.google.com/iam-admin/iam>.
2. Click on the filter table text bar. Type `Role: Service Account User`
3. Click the `Delete Bin` icon in front of the role `Service Account User` for every user listed as a result of a filter.
4. Click on the filter table text bar. Type `Role: Service Account Token Creator`
5. Click the `Delete Bin` icon in front of the role `Service Account Token Creator` for every user listed as a result of a filter.

## From Google Cloud CLI

1. Using a text editor, remove the bindings with the `roles/iam.serviceAccountUser` or `roles/iam.serviceAccountTokenCreator`.

    For example, you can use the iam.json file shown below as follows:

        { 
        "bindings": [ 
            { "members": [ "serviceAccount:our-project-123@appspot.gserviceaccount.com", ], "role": "roles/appengine.appViewer" }, 
            { "members": [ "user:email1@gmail.com" ], "role": "roles/owner" }, 
            { "members": [ "serviceAccount:our-project-123@appspot.gserviceaccount.com", "serviceAccount:123456789012-compute@developer.gserviceaccount.com" ], "role": "roles/editor" } 
        ], 
        "etag": "BwUjMhCsNvY=" 
        }

2. Update the project's IAM policy: gcloud projects set-iam-policy PROJECT_ID iam.json
