# Description

Setup multi-factor authentication for Google Cloud Platform accounts.

## Rationale

Multi-factor authentication requires more than one mechanism to authenticate a user. This secures user logins from attackers exploiting stolen or weak credentials.

## Audit

### From Google Cloud Console

For each Google Cloud Platform project, folder, or organization:

1. Identify non-service accounts.
2. Manually verify that multi-factor authentication for each account is set.

## Default Value

By default, multi-factor authentication is not set.

## References

1. <https://cloud.google.com/solutions/securing-gcp-account-u2f>
2. <https://support.google.com/accounts/answer/185839>
