# Description

This policy identifies Google GCE External Forwarding Rules that are configured to use a Target HTTP Proxy instead of a Target HTTPS Proxy.

## Rationale

Using a Target HTTP Proxy transmits data in cleartext, which exposes sensitive information to potential eavesdropping or man-in-the-middle attacks. Enforcing the use of a Target HTTPS Proxy ensures that all traffic to the load balancer is encrypted via HTTPS, thereby maintaining data confidentiality and integrity.

## Audit

This policy flags an external *Google GCE Forwarding Rule* as `INCOMPLIANT` if the `Target HTTP Proxy Unique ID` field is **not empty**.

A *Forwarding Rule* is marked as `INAPPLICABLE` if its `Load Balancing Scheme` is not **EXTERNAL** or **EXTERNAL_MANAGED**.
