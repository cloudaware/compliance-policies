# Description

API Keys should only be used for services in cases where other authentication methods are unavailable. API keys are always at risk because they can be viewed publicly, such as from within a browser, or they can be accessed on a device where the key resides. It is recommended to restrict API keys to use (call) only APIs required by an application.

## Rationale

Security risks involved in using API-Keys are below:

    • API keys are simple encrypted strings
    • API keys do not identify the user or the application making the API request
    • API keys are typically accessible to clients, making it easy to discover and steal an API key

In light of these potential risks, Google recommends using the standard authentication flow instead of API-Keys. However, there are limited cases where API keys are more appropriate. For example, if there is a mobile application that needs to use the Google Cloud Translation API, but doesn't otherwise need a backend server, API keys are the simplest way to authenticate to that API.

In order to reduce attack surfaces by providing `least privileges`, API-Keys can be restricted to use (call) only APIs required by an application.

## Impact

Setting `API restrictions` may break existing application functioning, if not done carefully.

## Audit

### From Console

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, Click the `API Key Name`. The API Key properties display on a new page.
3. For every API Key, ensure the section `Key restrictions` parameter `API restrictions` is not set to `None`.

Or,
Ensure `API restrictions` is not set to `Google Cloud APIs`

Note: `Google Cloud APIs` represents the API collection of all cloud services/APIs offered by Google cloud.

### From Google Cloud CLI

1. List all API Keys.

    gcloud services api-keys list

Each key should have a line that says `restrictions:` followed by varying parameters and NOT have a line saying `- service: cloudapis.googleapis.com` as shown here

    restrictions:
     apiTargets:
      - service: cloudapis.googleapis.com

## Default Value

By default, `API restrictions` are set to `None`.

## References

1. <https://cloud.google.com/docs/authentication/api-keys>
2. <https://cloud.google.com/apis/docs/overview>

## Additional Information

Some of the gcloud commands listed are currently in alpha and might change without notice.
