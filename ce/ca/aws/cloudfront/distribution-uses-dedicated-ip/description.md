# Description

This policy checks that AWS CloudFront Web Distributions use a custom SSL certificate configured with Server Name Indication (SNI) extension for handling HTTPS traffic.

## Rationale

When CloudFront is configured to serve HTTPS requests using dedicated IP addresses, AWS imposes **additional monthly charges**. These charges apply as soon as a custom SSL/TLS certificate is associated with a distribution and the distribution is enabled.

The Server Name Indication (SNI) extension to the TLS protocol allows CloudFront to deliver HTTPS traffic without relying on dedicated IP addresses. When using SNI, CloudFront assigns an IP address to each edge location. During the SSL/TLS handshake, the client includes the domain name in the SNI extension, allowing CloudFront to select the appropriate certificate. DNS then routes the request to the IP address of the corresponding edge location.

## Impact

SNI is supported by all modern browsers and HTTP clients released since 2010. Older clients lacking SNI support may fail to establish HTTPS connections, representing a compatibility risk for legacy environments.

## Audit

This policy flags an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if the `Viewer Certificate SSL Support Method` field is set to **vip** indicating that the distribution accepts HTTPS connections from all clients including those that don't support SNI.

The *Distribution* is marked as `INAPPLICABLE` if the `Viewer Certificate CloudFront Default` checkbox is **true** since the SNI extension requires a custom SSL/TLS certificate. Additionally, the custom certificates are discussed in [/ce/ca/aws/cloudfront/distribution-uses-default-certificate](../distribution-uses-default-certificate/policy.yaml.md).
