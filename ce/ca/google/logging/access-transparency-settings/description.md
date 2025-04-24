# Description

GCP Access Transparency provides audit logs for all actions that Google personnel take in your Google Cloud resources.

## Rationale

Controlling access to your information is one of the foundations of information security. Given that Google Employees do have access to your organizations' projects for support reasons, you should have logging in place to view who, when, and why your information is being accessed.

## Impact

To use Access Transparency your organization will need to have at one of the following support level: Premium, Enterprise, Platinum, or Gold. There will be subscription costs associated with support, as well as increased storage costs for storing the logs. You will also not be able to turn Access Transparency off yourself, and you will need to submit a service request to Google Cloud Support.

## Audit

### From Google Cloud Console

#### Determine if Access Transparency is Enabled

1. From the Google Cloud Home, click on the Navigation hamburger menu in the top left. Hover over the IAM & Admin Menu. Select `settings` in the middle of the column that opens.
2. The status will be under the heading `Access Transparency`. Status should be `Enabled`

## Default Value

By default Access Transparency is not enabled.

## References

1. <https://cloud.google.com/cloud-provider-access-management/access-transparency/docs/overview>
2. <https://cloud.google.com/cloud-provider-access-management/access-transparency/docs/enable>
3. <https://cloud.google.com/cloud-provider-access-management/access-transparency/docs/reading-logs>
4. <https://cloud.google.com/cloud-provider-access-management/access-transparency/docs/reading-logs#justification_reason_codes>
5. <https://cloud.google.com/cloud-provider-access-management/access-transparency/docs/supported-services>

## Additional Information

To enable Access Transparency for your Google Cloud organization, your Google Cloud organization must have one of the following customer support levels: Premium, Enterprise, Platinum, or Gold.
