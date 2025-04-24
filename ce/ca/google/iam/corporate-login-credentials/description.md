# Description

Use corporate login credentials instead of consumer accounts, such as Gmail accounts.

## Rationale

It is recommended fully-managed corporate Google accounts be used for increased visibility, auditing, and controlling access to Cloud Platform resources. Email accounts based outside of the user's organization, such as consumer accounts, should not be used for business purposes.

## Impact

There will be increased overhead as maintaining accounts will now be required. For smaller organizations, this will not be an issue, but will balloon with size.

## Audit

For each Google Cloud Platform project, list the accounts that have been granted access to that project:

### From Google Cloud CLI

     gcloud projects get-iam-policy PROJECT_ID

Also list the accounts added on each folder:

     gcloud resource-manager folders get-iam-policy FOLDER_ID

And list your organization's IAM policy:

     gcloud organizations get-iam-policy ORGANIZATION_ID

No email accounts outside the organization domain should be granted permissions in the IAM policies. This excludes Google-owned service accounts.

## Prevention

 To ensure that no email addresses outside the organization can be granted IAM permissions to its Google Cloud projects, folders or organization, turn on the Organization Policy for `Domain Restricted Sharing`.
 Learn more at: <https://cloud.google.com/resource-manager/docs/organization-policy/restricting-domains>

## Default Value

By default, no email addresses outside the organization's domain have access to its Google Cloud deployments, but any user email account can be added to the IAM policy for Google Cloud Platform projects, folders, or organizations.

## References

1. <https://support.google.com/work/android/answer/6371476>
2. <https://cloud.google.com/sdk/gcloud/reference/projects/get-iam-policy>
3. <https://cloud.google.com/sdk/gcloud/reference/resource-manager/folders/get-iam-policy>
4. <https://cloud.google.com/sdk/gcloud/reference/organizations/get-iam-policy>
5. <https://cloud.google.com/resource-manager/docs/organization-policy/restricting-domains>
6. <https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints>
