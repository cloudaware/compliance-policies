# Description

API Keys should only be used for services in cases where other authentication methods are unavailable. If they are in use it is recommended to rotate API keys every 90 days.

## Rationale

Security risks involved in using API-Keys are listed below:

    • API keys are simple encrypted strings
    • API keys do not identify the user or the application making the API request
    • API keys are typically accessible to clients, making it easy to discover and steal an API key

Because of these potential risks, Google recommends using the standard authentication flow instead of API Keys. However, there are limited cases where API keys are more appropriate. For example, if there is a mobile application that needs to use the Google Cloud Translation API, but doesn't otherwise need a backend server, API keys are the simplest way to authenticate to that API.

Once a key is stolen, it has no expiration, meaning it may be used indefinitely unless the project owner revokes or regenerates the key. Rotating API keys will reduce the window of opportunity for an access key that is associated with a compromised or terminated account to be used.

API keys should be rotated to ensure that data cannot be accessed with an old key that might have been lost, cracked, or stolen.

## Impact

`Regenerating Key` may break existing client connectivity as the client will try to connect with older API keys they have stored on devices.

## Audit

### From Google Cloud Console

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, for every key ensure the `creation date` is less than 90 days.

### From Google Cloud CLI

To list keys, use the command

    gcloud services api-keys list

Ensure the date in `createTime` is within 90 days.

## References

1. <https://developers.google.com/maps/api-security-best-practices#regenerate-apikey>
2. <https://cloud.google.com/sdk/gcloud/reference/alpha/services/api-keys>

## Additional Information

There is no option to automatically regenerate (rotate) API keys periodically.
