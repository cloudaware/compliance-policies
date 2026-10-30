# Description

This policy identifies AWS Application and Network Load Balancers with listeners configured to use outdated SSL/TLS security policies that permit deprecated protocol versions or weak cryptographic ciphers.

## Rationale

AWS provides predefined security policies for load balancer listeners that govern the protocols and cipher suites used during the SSL/TLS handshake. Older protocol versions, such as TLS 1.0 and TLS 1.1, are considered insecure and have been deprecated by industry standards and major compliance frameworks.

Modern security policies (for example, `ELBSecurityPolicy-TLS13-1-3-2021-06`) enforce stronger cryptographic controls by requiring TLS 1.2 or TLS 1.3 and by limiting connections to secure, approved cipher suites. Using these policies helps protect data in transit from known cryptographic weaknesses and downgrade attacks.

## Audit

This policy flags an *AWS ELB Load Balancer* as `INCOMPLIANT` if any related *AWS ELB Load Balancer Listener* is configured with a `Policy Name` that is **not** one of the following recommended policies:

- **ELBSecurityPolicy-TLS13-1-2-2021-06**
- **ELBSecurityPolicy-TLS13-1-2-FIPS-2023-04**
- **ELBSecurityPolicy-TLS13-1-3-2021-06**
- **ELBSecurityPolicy-TLS13-1-3-FIPS-2023-04**
- **ELBSecurityPolicy-TLS13-1-2-Res-2021-06**
- **ELBSecurityPolicy-TLS13-1-2-Res-FIPS-2023-04**

*Classic Load Balancers* and *Gateway Load Balancers*, as well as load balancers without any associated listeners, are marked as `INAPPLICABLE`.
