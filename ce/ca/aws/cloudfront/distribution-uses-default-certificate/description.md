# Description

This policy checks that an AWS CloudFront Web Distribution is configured to use a custom SSL/TLS certificate.

A custom SSL/TLS certificate allows you to serve your content over HTTPS using your own domain name in the URL, rather than the default `*.cloudfront.net` domain name assigned to your distribution.

## Rationale

Deploying a custom SSL/TLS certificate and alternate CNAME ensures that end users see your organization’s domain in the browser’s address bar. This provides clear assurance that the connection to your application is encrypted and authenticated.

## Impact

It may incur additional fees for certificate procurement and renewal if not using a free ACM certificate.

You must create the appropriate CNAME records in your DNS zone to map your custom domain to the CloudFront distribution’s domain. Misconfigured DNS entries can lead to service interruptions or SSL validation failures.

## Audit

This policy flags an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if the `Viewer Certificate CloudFront Default` checkbox is **true**.
