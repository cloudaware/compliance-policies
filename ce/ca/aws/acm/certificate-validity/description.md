# Description

This policy identifies AWS ACM Certificates that have failed the validation process.

All requests made during the SSL/TLS certificate issuance or renewal process must be successfully validated. These requests are managed within your AWS account by Amazon Certificate Manager, a service that enables you to provision, deploy, and manage SSL/TLS certificates for use with AWS resources such as Elastic Load Balancers, Amazon CloudFront distributions, and APIs hosted on Amazon API Gateway.

## Rationale

ACM certificates must be validated using DNS or email-based validation to confirm domain ownership before they can be issued.

If an ACM certificate is not validated within the required timeframe (typically 72 hours from the time the request is created), the validation attempt fails and the certificate request becomes invalid. In such cases, a new SSL/TLS certificate must be requested, which may result in service disruptions or application downtime.

## Audit

This policy marks an *AWS ACM Certificate* as `INCOMPLIANT` if the `Status` field is set to **FAILED** or **VALIDATION_TIMED_OUT**.

If the *ACM Certificate* `Status` is **PENDING_VALIDATION**, the resource is marked as `INAPPLICABLE`.

An empty `Status` indicates a potential permission issue with the `acm:DescribeCertificate` API call. In this case, the resource is marked as `UNDETERMINED`.
