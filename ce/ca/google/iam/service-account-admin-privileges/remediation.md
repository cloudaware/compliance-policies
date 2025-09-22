# Remediation

## From Google Cloud Console

1. Go to `IAM & admin/IAM` using <https://console.cloud.google.com/iam-admin/iam>
2. Under the `IAM` Tab look for `VIEW BY PRINCIPALS`
3. Filter `PRINCIPALS` using `type : Service account`
4. Look for the Service Account with the Principal nomenclature: `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`
5. Identify `User-Managed user created` service account with roles containing `*Admin` or `*admin` or role matching `Editor` or role matching `Owner` under `Role` Column.
6. Click on `Edit (Pencil Icon)` for the Service Account, it will open all the roles which are assigned to the Service Account.
7. Click the `Delete bin` icon to remove the role from the Principal (service account in this case)

## From Google Cloud CLI

    gcloud projects get-iam-policy PROJECT_ID --format json > iam.json

1. Using a text editor, Remove Role which contains roles/*Admin or roles/*admin or matched roles/editor or matches 'roles/owner`. Add a role to the bindings array that defines the group members and the role for those members.

    For example, to grant the role roles/appengine.appViewer to the ServiceAccount which is roles/editor, you would change the example shown below as follows:
         
    ```json
    {
        "bindings": [
            { "members": [ "serviceAccount:our-project-123@appspot.gserviceaccount.com", ], "role": "roles/appengine.appViewer" },
            { "members": [ "user:email1@gmail.com" ], "role": "roles/owner" },
            { "members": [ "serviceAccount:our-project-123@appspot.gserviceaccount.com", "serviceAccount:123456789012-compute@developer.gserviceaccount.com" ], "role": "roles/editor" }
            ],
        "etag": "BwUjMhCsNvY="
    }
    ```

2. Update the project's IAM policy:

    gcloud projects set-iam-policy PROJECT_ID iam.json
