# Description

It is recommended that the IAM policy on a Cloud Storage bucket does not allow anonymous or public access.

## Rationale

Allowing anonymous or public access grants permissions to anyone to access bucket content. Such access might not be desired if you are storing sensitive data. Ensure that anonymous or public access to a bucket is not allowed.

## Impact

No storage buckets would be publicly accessible. You would have to explicitly administer bucket access.

## Audit

### From Google Cloud Console

1. Go to `Storage browser` by visiting <https://console.cloud.google.com/storage/browser>.
2. Click on each bucket name to go to its `Bucket details` page.
3. Click on the `Permissions` tab.
4. Ensure that `allUsers` and `allAuthenticatedUsers` are not in the `Members` list.

### From Google Cloud CLI

1. List all buckets in a project:

    ```sh
    gsutil ls
    ```

2. Check the IAM policy for each bucket:

    ```sh
    gsutil iam get gs://{{bucket-name}}
    ```

No role should contain `allUsers` and/or `allAuthenticatedUsers` as a member.

### Using Rest API

1. List all buckets in a project:

    Get <https://www.googleapis.com/storage/v1/b?project={{project-name}}>

2. Check the IAM policy for each bucket:

    GET <https://www.googleapis.com/storage/v1/b/{{bucket-name}}/iam>

No role should contain `allUsers` and/or `allAuthenticatedUsers` as a member.

## Prevention

You can prevent Storage buckets from becoming publicly accessible by setting up the `Domain restricted sharing` organization policy at: <https://console.cloud.google.com/iam-admin/orgpolicies/iam-allowedPolicyMemberDomains>.

## Default Value

By default, Storage buckets are not publicly shared.

## References

1. <https://cloud.google.com/storage/docs/access-control/iam-reference>
2. <https://cloud.google.com/storage/docs/access-control/making-data-public>
3. <https://cloud.google.com/storage/docs/gsutil/commands/iam>

## Additional Information

To implement access restrictions on buckets, configuring bucket IAM is preferred over configuring bucket ACLs. In the GCP console, `Edit Permissions` for a bucket exposes IAM configurations only. Bucket ACLs are configured automatically as needed to implement or support user-enforced bucket IAM policy. If an administrator changes a bucket ACL using the command line (gsutil) or API, bucket IAM also gets updated automatically.
