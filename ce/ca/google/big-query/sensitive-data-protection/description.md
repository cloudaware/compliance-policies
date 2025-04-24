# Description

BigQuery tables can contain sensitive data that for security purposes should be discovered, monitored, classified, and protected. Google Cloud's Sensitive Data Protection tools can automatically provide data classification of all BigQuery data across an organization.

## Rationale

Using a cloud service or 3rd party software to continuously monitor and automate the process of data discovery and classification for BigQuery tables is an important part of protecting the data.

Sensitive Data Protection is a fully managed data protection and data privacy platform that uses machine learning and pattern matching to discover and classify sensitive data in Google Cloud.

## Impact

There is a cost associated with using Sensitive Data Protection. There is also typically a cost associated with 3rd party tools that perform similar processes and protection.

## Audit

1. Go to Cloud DLP by visiting <https://console.cloud.google.com/dlp/landing/dataProfiles/configurations>.
2. Verify there is a discovery scan configuration either for the organization or project.

## References

1. <https://cloud.google.com/dlp/docs/data-profiles>
2. <https://cloud.google.com/dlp/docs/analyze-data-profiles>
3. <https://cloud.google.com/dlp/docs/data-profiles-remediation>
4. <https://cloud.google.com/dlp/docs/send-profiles-to-scc>
5. <https://cloud.google.com/dlp/docs/profile-org-folder#chronicle>
6. <https://cloud.google.com/dlp/docs/profile-org-folder#publish-pubsub>
