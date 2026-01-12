# Description

This policy identifies AWS OpenSearch Domains that do not enforce HTTPS or are not configured to use the latest Transport Layer Security (TLS) security policy.

## Rationale

AWS OpenSearch Service supports multiple TLS security policies that define the minimum TLS protocol version and the set of allowed cipher suites for HTTPS endpoints. Legacy protocols such as TLS 1.0 and TLS 1.1 contain known cryptographic weaknesses and should not be used.

Enforcing HTTPS with a modern TLS policy (TLS 1.2 or higher) significantly strengthens data-in-transit protection by ensuring that communications between clients and the OpenSearch domain remain encrypted, authenticated, and resistant to interception or tampering.

## Audit

This policy flags an *AWS OpenSearch Service domain* as `INCOMPLIANT` when either of the following conditions is met:

- `Endpoint Options: Enforce HTTPS` is set to **false**, or
- `Endpoint Options: TLS Security Policy` is configured with a legacy policy, including **Policy-Min-TLS-1-0-2019-07** or **Policy-Min-TLS-1-2-2019-07**
