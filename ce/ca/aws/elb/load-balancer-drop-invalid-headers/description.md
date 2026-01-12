# Description

This policy identifies AWS ELB Application Load Balancers that are not configured to drop invalid HTTP header fields. By default, the `routing.http.drop_invalid_header_fields.enabled` attribute is set to `false`, which allows the load balancer to forward HTTP headers that do not conform to protocol specifications to target groups.

> **Note**:
The `routing.http.drop_invalid_header_fields.enabled` attribute  was introduced to provide baseline protection against HTTP desync by dropping malformed HTTP headers. The `routing.http.desync_mitigation_mode` attribute ([`AWS ELB Load Balancer is not configured with defensive or strictest desync mitigation mode`](ce\ca\aws\elb\load-balancer-desync-mitigation-mode)) was later added to offer more comprehensive and configurable protection against HTTP desync attacks. You are not required to enable both attributes; instead, you should select the option that best aligns with your application’s security and compatibility requirements.

## Rationale

Enabling this feature helps protect backend applications from **HTTP Request Smuggling** and **HTTP Desynchronization** attacks. These attack techniques exploit malformed or ambiguous HTTP headers to bypass security controls, poison web caches, or hijack user sessions. By dropping invalid headers at the load balancer level, only well-formed and standards-compliant requests are allowed to reach backend services, reducing the overall attack surface.

## Impact

Enabling this setting may cause requests containing non-compliant or malformed HTTP headers to be rejected. Applications or clients that rely on such headers may experience request failures.

## Audit

This policy flags an *AWS ELB Application Load Balancer* as `INCOMPLIANT` when the `Additional Attributes` include **routing.http.drop_invalid_header_fields.enabled: falseZ**.
