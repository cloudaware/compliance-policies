# Remediation

## From Google Cloud Console

1. Go to `Essential Contacts` by visiting <https://console.cloud.google.com/iam-admin/essential-contacts>
2. Make sure the organization appears in the resource selector at the top of the page. The resource selector tells you what project, folder, or organization you are currently managing contacts for.
3. Click `+Add contact`
4. In the `Email` and `Confirm Email` fields, enter the email address of the contact.
5. From the `Notification categories` drop-down menu, select the notification categories that you want the contact to receive communications for.
6. Click `Save`

## From Google Cloud CLI

1. To add organization essential contacts, run the following command:

    ```sh
    gcloud essential-contacts create \
        --email="{{email}}" \
        --notification-categories="{{notification-categories}}" \
        --organization={{organization-id}}
    ```
