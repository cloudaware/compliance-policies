# Description

This policy checks that AWS CloudFront Web Distributions are configured to use secure, up‑to‑date SSL/TLS protocols for client connections. It identifies distributions that allow outdated protocols such as `SSLv3`, `TLS 1.0`, and `TLS 1.1`, which are susceptible to known cryptographic weaknesses.

## Rationale

Allowing outdated SSL/TLS protocols exposes traffic to a range of security risks, including eavesdropping and man-in-the-middle attacks. Modern protocols like `TLS 1.2` and newer offer stronger cipher suites and are required by many regulatory and compliance standards (e.g., PCI DSS).

## Audit

This policy flags an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if at least one custom *AWS CloudFront Origin* associated with the distribution (excluding S3 static websites as origin) is configured with `Custom Origin Config Origin SSL Protocol` to allow the following protocols: **SSLv3**, **TLSv1**, **TLSv1.1**.

If a Web Distribution has no Origins in the CMDB, the Distribution is marked as `UNDETERMINED`.
