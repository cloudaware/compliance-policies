# Description

API Keys should only be used for services in cases where other authentication methods are unavailable. In this case, unrestricted keys are insecure because they can be viewed publicly, such as from within a browser, or they can be accessed on a device where the key resides. It is recommended to restrict API key usage to trusted hosts, HTTP referrers and apps. It is recommended to use the more secure standard authentication flow instead.

## Rationale

Security risks involved in using API-Keys appear below:

    • API keys are simple encrypted strings
    • API keys do not identify the user or the application making the API request
    • API keys are typically accessible to clients, making it easy to discover and steal an API key

In light of these potential risks, Google recommends using the standard authentication flow instead of API keys. However, there are limited cases where API keys are more appropriate. For example, if there is a mobile application that needs to use the Google Cloud Translation API, but doesn't otherwise need a backend server, API keys are the simplest way to authenticate to that API.

In order to reduce attack vectors, API-Keys can be restricted only to trusted hosts, HTTP referrers and applications.

## Impact

Setting `Application Restrictions` may break existing application functioning, if not done carefully.

## Audit

### From Google Cloud Console

1. Go to `APIs & Services\Credentials` using <https://console.cloud.google.com/apis/credentials>
2. In the section `API Keys`, Click the `API Key Name`. The API Key properties display on a new page.
3. For every API Key, ensure the section `Key restrictions` parameter `Application restrictions` is not set to `None`.

Or,

1. Ensure `Application restrictions` is set to `HTTP referrers` and the referrer is not set to wild-cards `(* or *.[TLD] or *.[TLD]/*)` allowing access to any/wide HTTP referrer(s)

Or,

1. Ensure `Application restrictions` is set to `IP addresses` and referrer is not set to `any host (0.0.0.0 or 0.0.0.0/0 or ::0)`

### From Google Cloud Command Line

1. Run the following from within the project you wish to audit

    gcloud services api-keys list --filter="-restrictions:*" --format="table[box](displayName:label='Key With No Restrictions')

## Default Value

By default, `Application Restrictions` are set to `None`.

## References

1. <https://cloud.google.com/docs/authentication/api-keys>
2. <https://cloud.google.com/sdk/gcloud/reference/services/api-keys/list>
3. <https://cloud.google.com/sdk/gcloud/reference/alpha/services/api-keys/update>
