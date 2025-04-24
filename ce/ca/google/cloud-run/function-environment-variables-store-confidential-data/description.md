# Description

Google Cloud Functions allow you to host serverless code that is executed when an event is triggered, without the requiring the management a host operating system. These functions can also store environment variables to be used by the code that may contain authentication or other information that needs to remain confidential.

## Rationale

It is recommended to use the Secret Manager, because environment variables are stored unencrypted, and accessible for all users who have access to the code.

## Impact

There should be no impact on the Cloud Function. There are minor costs after 10,000 requests a month to the Secret Manager API as well for a high use of other functions. Modifying the Cloud Function to use the Secret Manager may prevent it running to completion.

## Audit

### Determine if Confidential Information is Stored in your Functions in Cleartext

#### From Google Cloud Console

1. Within the project you wish to audit, select the Navigation hamburger menu in the top left. Scroll down to under the heading `Serverless`, then select `Cloud Functions`
2. Click on a function name from the list
3. Open the `Variables` tab and you will see both `buildEnvironmentVariables` and `environmentVariables`
4. Review the variables whether they are secrets
5. Repeat step 3-5 until all functions are reviewed

#### From Google Cloud CLI

1. To view a list of your cloud functions run

    gcloud functions list

2. For each cloud function in the list run the following command.

    gcloud functions describe <function_name>

3. Review the settings of the buildEnvironmentVariables and environmentVariables.
 Determine if this is data that should not be publicly accessible.

### Determine if Secret Manager API is 'Enabled' for your Project

#### From Google Cloud Console

1. Within the project you wish to audit, select the Navigation hamburger menu in the top left. Hover over `APIs & Services` to under the heading `Serverless`, then select `Enabled APIs & Services` in the menu that opens up.
2. Click the button `+ Enable APIS and Services`
3. In the `Search` bar, search for `Secret Manager API` and select it.
4. If it is enabled, the blue box that normally says `Enable` will instead say `Manage`.

#### From Google Cloud CLI

1. Within the project you wish to audit, run the following command.

    gcloud services list

2. If `Secret Manager API` is in the list, it is enabled.

## Default Value

By default Secret Manager is not enabled.

## References

1. <https://cloud.google.com/functions/docs/configuring/env-var#managing_secrets>
2. <https://cloud.google.com/secret-manager/docs/overview>

## Additional Information

There are slight additional costs to using the Secret Manager API. Review the documentation to determine your organizations' needs.
