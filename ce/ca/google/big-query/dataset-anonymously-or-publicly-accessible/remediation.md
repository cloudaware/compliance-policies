# Remediation

## From Google Cloud Console

1. Go to `BigQuery` by visiting: <https://console.cloud.google.com/bigquery>.
2. Select the dataset from `Resources`.
3. Click `SHARING` near the right side of the window and select `Permissions`.
4. Review each attached role.
5. Click the delete icon for each member `allUsers` or `allAuthenticatedUsers`. On the popup click `Remove`.

## From Google Cloud CLI

List the name of all datasets.

            bq ls

Retrieve the data set details:

            bq show --format=prettyjson PROJECT_ID:DATASET_NAME > PATH_TO_FILE

In the access section of the JSON file, update the dataset information to remove all roles containing `allUsers` or `allAuthenticatedUsers`.

Update the dataset:

            bq update --source PATH_TO_FILE PROJECT_ID:DATASET_NAME
