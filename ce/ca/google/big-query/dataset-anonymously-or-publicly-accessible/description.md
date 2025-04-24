# Description

It is recommended that the IAM policy on BigQuery datasets does not allow anonymous and/or public access.

## Rationale

Granting permissions to `allUsers` or `allAuthenticatedUsers` allows anyone to access the dataset. Such access might not be desirable if sensitive data is being stored in the dataset. Therefore, ensure that anonymous and/or public access to a dataset is not allowed.

## Impact

The dataset is not publicly accessible. Explicit modification of IAM privileges would be necessary to make them publicly accessible.

## Audit

### From Google Cloud Console

1. Go to `BigQuery` by visiting: <https://console.cloud.google.com/bigquery>.
2. Select a dataset from `Resources`.
3. Click `SHARING` near the right side of the window and select `Permissions`.
4. Validate that none of the attached roles contain `allUsers` or `allAuthenticatedUsers`.

### From Google Cloud CLI

List the name of all datasets.

            bq ls

Retrieve each dataset details using the following command:

            bq show PROJECT_ID:DATASET_NAME

Ensure that `allUsers` and `allAuthenticatedUsers` have not been granted access to the dataset.

## Prevention

 You can prevent Bigquery dataset from becoming publicly accessible by setting up the `Domain restricted sharing` organization policy at: <https://console.cloud.google.com/iam-admin/orgpolicies/iam-allowedPolicyMemberDomains>.

## Default Value

By default, BigQuery datasets are not publicly accessible.

## References

1. <https://cloud.google.com/bigquery/docs/dataset-access-controls>
