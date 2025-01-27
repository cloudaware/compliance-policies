# Description

Renew your SSL/TLS certificates in AWS ACM that are ineligible for automatic renewal at least 7 days before their expiration date. This proactive approach is essential for maintaining the security and reliability of your applications and services that rely on these certificates.

## Rationale

Timely renewal of SSL/TLS certificates prevents service disruptions that can occur due to expired certificates, ensuring continuous protection for your data and communications. By regularly updating your certificates, you ensure that your applications use the latest and most secure encryption standards. Additionally, maintaining a robust certificate management policy can aid in compliance with industry regulations that require the use of strong, up-to-date encryption methods.

## Audit

This policy marks a certificate as `INCOMPLIANT` when the following conditions are met: the `Status` field is set to `ISSUED`, the `Renewal Eligibility` is `INELIGIBLE`, and the certificate is set to expire within the next 7 days, as indicated by the `Not After` field.

A certificate will be marked as `INAPPLICABLE` if the `Status` field contains any value other than `ISSUED`, or if the certificate is eligible for automatic renewal, as indicated by the `Renewal Eligibility` field.

If either the `Status` or `Renewal Eligibility` field is empty, this may indicate a permissions issue with the `acm:DescribeCertificate` API call, and the certificate will be marked as `UNDETERMINED`.
