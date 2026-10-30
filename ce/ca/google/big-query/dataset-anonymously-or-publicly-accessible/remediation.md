# Remediation

## From Google Cloud Console

1. Go to `BigQuery` by visiting: <https://console.cloud.google.com/bigquery>.
2. Select the dataset from `Resources`.
3. Click `SHARING` near the right side of the window and select `Permissions`.
4. Review each attached role.
5. Click the delete icon for each member `allUsers` or `allAuthenticatedUsers`. On the popup, click `Remove`.

## From Google Cloud CLI

List the name of all datasets.

```sh
bq ls
```

Retrieve the dataset details:

```sh
bq show \
    --format=prettyjson {{project-id}}:{{dataset-name}} > {{path-to-file}}
```

In the access section of the JSON file, update the dataset information to remove all roles containing `allUsers` or `allAuthenticatedUsers`.

Update the dataset:

```sh
bq update \
    --source {{path-to-file}} {{project-id}}:{{dataset-name}}
```
