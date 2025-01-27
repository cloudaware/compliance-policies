# Description

Ensure that all expired Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates in AWS Certificate Manager (ACM) are removed. AWS Certificate Manager is a service that allows easy provisioning, management, and deployment of SSL/TLS certificates for use with other Amazon services like Elastic Load Balancing (ELB) and CloudFront.

## Rationale

Removing expired certificates enhances security and helps maintain compliance with Amazon's Security Best Practices. Expired certificates may expose sensitive data to interception by malicious actors, posing security and credibility risks. By removing these certificates, organizations mitigate the risk of accidentally deploying invalid SSL/TLS certificates to resources such as Elastic Load Balancing (ELB), which could lead to front-end errors for web applications or websites reliant on ELB and might be perceived as a lack of maintenance or security awareness.

## Audit

This policy will mark a certificate as `INCOMPLIANT` if the `Status` field is set to `EXPIRED`.

Empty `Status` indicates that there is a possible permission issue with `acm:DescribeCertificate` API call and the object will be marked as `UNDETERMINED`.
