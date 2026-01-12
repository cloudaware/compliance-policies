# Description

This policy identifies AWS Elastic Load Balancer (ELB) listeners that are configured with insecure protocols. It is recommended to use only secure protocols, such as HTTPS, TLS, SSL, or QUIC, to encrypt communications between clients and load balancers.

## Rationale

Using unencrypted protocols allows data to be transmitted in plaintext, which poses a significant security risk. Secure protocols such as HTTPS, TLS and QUIC provide encryption, ensuring that intercepted data cannot be read or modified. QUIC, which underpins HTTP/3, also delivers enhanced security and performance compared to earlier transport mechanisms. Encrypted communication helps prevent man-in-the-middle (MITM) attacks and protects the integrity and confidentiality of data in transit.

## Audit

This policy flags an *AWS ELB Load Balancer* as `INCOMPLIANT` if any related *ELB Load Balancer Listener* is not configured to use a secure protocol, such as **HTTPS**, **TLS**, **SSL**, or **QUIC**.

A *Listener* configured with the **TCP** protocol on port **443** is marked as `COMPLIANT`, as this configuration is commonly used to forward encrypted traffic directly to targets without decrypting it at the load balancer.
