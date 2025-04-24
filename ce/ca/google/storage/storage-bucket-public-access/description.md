# Description

It is recommended that IAM policy on Cloud Storage bucket does not allows anonymous or public access.

## Rationale

Allowing anonymous or public access grants permissions to anyone to access bucket content. Such access might not be desired if you are storing any sensitive data. Hence, ensure that anonymous or public access to a bucket is not allowed.

## Impact

No storage buckets would be publicly accessible. You would have to explicitly administer bucket access.

## Audit

### From Google Cloud Console

1. Go to `Storage browser` by visiting <https://console.cloud.google.com/storage/browser>.
2. Click on each bucket name to go to its `Bucket details` page.
3. Click on the `Permissions` tab.
4. Ensure that `allUsers` and `allAuthenticatedUsers` are not in the `Members` list.

### From Google Cloud CLI

1. List all buckets in a project

            gsutil ls

2. Check the IAM Policy for each bucket:

            gsutil iam get gs://BUCKET_NAME

No role should contain `allUsers` and/or `allAuthenticatedUsers` as a member.

### Using Rest API

1. List all buckets in a project

            Get https://www.googleapis.com/storage/v1/b?project=<ProjectName>

2. Check the IAM Policy for each bucket

            GET https://www.googleapis.com/storage/v1/b/<bucketName>/iam

No role should contain `allUsers` and/or `allAuthenticatedUsers` as a member.

## Prevention

You can prevent Storage buckets from becoming publicly accessible by setting up the `Domain restricted sharing` organization policy at: <https://console.cloud.google.com/iam-admin/orgpolicies/iam-allowedPolicyMemberDomains>.

## Default Value

By Default, Storage buckets are not publicly shared.

## References

1. <https://cloud.google.com/storage/docs/access-control/iam-reference>
2. <https://cloud.google.com/storage/docs/access-control/making-data-public>
3. <https://cloud.google.com/storage/docs/gsutil/commands/iam>

## Additional Information

To implement Access restrictions on buckets, configuring Bucket IAM is preferred way than configuring Bucket ACL. On GCP console, "Edit Permissions" for bucket exposes IAM configurations only. Bucket ACLs are configured automatically as per need in order to implement/support User enforced Bucket IAM policy. In-case administrator changes bucket ACL using command-line(gsutils)/API bucket IAM also gets updated automatically.
