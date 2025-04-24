# Description

API Keys should only be used for services in cases where other authentication methods are unavailable. Unused keys with their permissions in tact may still exist within a project. Keys are insecure because they can be viewed publicly, such as from within a browser, or they can be accessed on a device where the key resides. It is recommended to use standard authentication flow instead.

## Rationale

To avoid the security risk in using API keys, it is recommended to use standard authentication flow instead. Security risks involved in using API-Keys appear below:

    • API keys are simple encrypted strings
    • API keys do not identify the user or the application making the API request
    • API keys are typically accessible to clients, making it easy to discover and steal an API key

## Impact

Deleting an API key will break dependent applications (if any).

## Audit

### From Console

1. From within the Project you wish to audit Go to `APIs & Services\Credentials`.
2. In the section `API Keys`, no API key should be listed.

### From Google Cloud Command Line

1. Run the following from within the project you wish to audit

    gcloud services api-keys list --filter.

2. There should be no keys listed at the project level.

## Default Value

By default, API keys are not created for a project.

## References

1. <https://cloud.google.com/docs/authentication/api-keys>
2. <https://cloud.google.com/sdk/gcloud/reference/services/api-keys/list>
3. <https://cloud.google.com/docs/authentication>
4. <https://cloud.google.com/sdk/gcloud/reference/alpha/services/api-keys/delete>

## Additional Information

Google recommends using the standard authentication flow instead of using API keys. However, there are limited cases where API keys are more appropriate. For example, if there is a mobile application that needs to use the Google Cloud Translation API, but doesn't otherwise need a backend server, API keys are the simplest way to authenticate to that API.

If a business requires API keys to be used, then the API keys should be secured properly.
