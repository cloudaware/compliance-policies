# Description

This policy identifies AWS CloudFront distributions that are not configured with a security policy enforcing a minimum TLS version of `TLSv1.2_2021` and appropriate cipher suites for HTTPS viewer connections. An AWS CloudFront security policy defines two key parameters: the SSL/TLS protocol version CloudFront uses to communicate with viewers and the cipher suites used to encrypt content delivered to users.

It is recommended to configure CloudFront distributions to use TLS 1.2 (preferably TLS 1.3) as the minimum supported protocol version, unless compatibility requirements mandate support for legacy browsers or devices that do not support TLS 1.2 or later.

## Rationale

Using a predefined security policy that enforces TLS 1.2 or TLS 1.3 as the minimum protocol version enhances the security posture of websites and web applications delivered through CloudFront by reducing exposure to known cryptographic vulnerabilities.

## Audit

This policy flags an *AWS CloudFront Distribution* as `INCOMPLIANT` if `Viewer Certificate Min Protocol Version` is:

- **SSLv3**,
- **TLSv1**,
- **TLSv1_2016**,
- **TLSv1.1_2016**,
- **TLSv1.2_2018**,
- **TLSv1.2_2019**, or
- **empty**.
