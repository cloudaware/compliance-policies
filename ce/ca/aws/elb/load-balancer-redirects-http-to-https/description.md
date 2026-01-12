# Description

This policy identifies AWS Application Elastic Load Balancers that have an HTTP listener but do not enforce a redirect to an HTTPS listener on port 443.

## Rationale

Unencrypted HTTP traffic is susceptible to interception and man-in-the-middle attacks. Although some applications may handle HTTPS enforcement internally, implementing an HTTP-to-HTTPS redirect at the load balancer level ensures that all client traffic is encrypted before reaching the application servers, providing a consistent and centralized security control.

## Audit

This policy flags an *AWS ELB Application Load Balancer* as `INCOMPLIANT` if it has an associated **HTTP** *Listener* that does not include either:

* a **Default Action**, or
* a *Listener Rule*

    configured to redirect traffic to **HTTPS on port 443**.
