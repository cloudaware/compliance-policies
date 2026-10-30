# Description

It is recommended to assign the `Service Account User (iam.serviceAccountUser)` and `Service Account Token Creator (iam.serviceAccountTokenCreator)` roles to a user for a specific service account rather than assigning the role to a user at the project level.

## Rationale

A service account is a special Google account that belongs to an application or a virtual machine (VM), instead of an individual end user. An application or VM instance uses the service account to call the service's Google API so that users are not directly involved. In addition to being an identity, a service account is a resource that has IAM policies attached to it. These policies determine who can use the service account.

Users with IAM roles to update App Engine and Compute Engine instances (such as App Engine Deployer or Compute Instance Admin) can effectively run code as the service accounts used to run these instances, and indirectly gain access to all the resources for which the service accounts have access. Similarly, SSH access to a Compute Engine instance may also provide the ability to execute code as that instance's service account.

Based on business needs, there could be multiple user-managed service accounts configured for a project. Granting the `iam.serviceAccountUser` or `iam.serviceAccountTokenCreator` roles to a user for a project gives the user access to all service accounts in the project, including service accounts that may be created in the future. This can result in elevation of privileges by using service accounts and corresponding Compute Engine instances.

To implement least privilege best practices, IAM users should not be assigned the `Service Account User` or `Service Account Token Creator` roles at the project level. Instead, these roles should be assigned to a user for a specific service account, giving that user access to the service account. The `Service Account User` role allows a user to bind a service account to a long-running job service, whereas the `Service Account Token Creator` role allows a user to directly impersonate the identity of a service account.

## Impact

After revoking `Service Account User` or `Service Account Token Creator` roles at the project level from all impacted user account(s), these roles should be assigned to a user(s) for specific service account(s) according to business needs.

## Audit

### From Google Cloud Console

1. Go to the IAM page in the GCP Console by visiting <https://console.cloud.google.com/iam-admin/iam>
2. Click the filter text bar and type `Role: Service Account User`.
3. Ensure no user is listed as a result of the filter.
4. Click the filter text bar and type `Role: Service Account Token Creator`.
5. Ensure no user is listed as a result of the filter.

### From Google Cloud CLI

To ensure IAM users are not assigned Service Account User role at the project level:

    ```sh
    gcloud projects get-iam-policy {{project-id}} \
        --format=json | jq '.bindings[].role' | grep "roles/iam.serviceAccountUser"
    ```

These commands should not return any output.

## Default Value

By default, users do not have the Service Account User or Service Account Token Creator role assigned at the project level.

## References

1. <https://cloud.google.com/iam/docs/service-accounts>
2. <https://cloud.google.com/iam/docs/granting-roles-to-service-accounts>
3. <https://cloud.google.com/iam/docs/understanding-roles>
4. <https://cloud.google.com/iam/docs/granting-changing-revoking-access>
5. <https://console.cloud.google.com/iam-admin/iam>

## Additional Information

To assign the role `roles/iam.serviceAccountUser` or `roles/iam.serviceAccountTokenCreator` to a user on a service account instead of a project:

1. Go to <https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts>
2. Select `Target Project`
3. Select the target service account. Click `Permissions` on the top bar. The permission pane opens on the right side of the page.
4. Add desired members with `Service Account User` or `Service Account Token Creator` role.
