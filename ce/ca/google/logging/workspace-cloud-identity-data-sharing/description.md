# Description

Google Workspace and Cloud Identity can share administrative audit log data with Google Cloud. Enable this setting so user, password, and security configuration changes from the identity provider are available in Cloud Logging.

## Rationale

Centralized identity audit logs help security teams correlate Workspace or Cloud Identity administrative events with Google Cloud resource activity. Without this setting, important identity events remain only in the Admin Console, which limits monitoring, alerting, retention, and incident investigation.

## Impact

Enabling the setting sends additional audit log data to Google Cloud. Organizations should confirm that log retention, access controls, and monitoring rules are configured for the resulting Cloud Logging data.

## Audit

### From Google Admin Console

1. Sign in to the Google Admin Console as a Super Admin.
2. Go to `Account` > `Account settings`.
3. Open `Legal and compliance`.
4. Locate `Sharing options` > `Google Cloud Platform Sharing Options`.
5. Verify that the setting is `Enabled`.

## Default Value

By default, Google Workspace and Cloud Identity Admin audit logs are available in the Google Admin Console and are not necessarily shared with Google Cloud.
