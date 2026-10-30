# Description

This policy identifies AWS CloudFront Web Distributions that are not associated with an AWS WAF Classic or AWS WAF (WAF v2) web ACL.

All CloudFront web distributions should be integrated with AWS WAF to help protect against application-layer attacks that could compromise application security or impose unnecessary load on backend resources.

## Rationale

AWS WAF provides an additional layer of security by enabling fine-grained control over inbound web traffic through customizable rules that allow, block, or monitor requests. Without AWS WAF integration, CloudFront distributions are more susceptible to common web application attack vectors, including:

- **SQL Injection**: Attempts to manipulate backend databases through malicious query injection.
- **Cross-Site Scripting (XSS)**: Injection of malicious scripts into web pages viewed by end users.
- **Distributed Denial of Service (DDoS)**: High-volume illegitimate traffic intended to disrupt application availability.
- **Malicious Bots**: Automated scraping or scanning activity that can degrade performance and availability.

## Audit

This policy marks an *AWS CloudFront Web Distribution* as `INCOMPLIANT` if it is **not associated** with either an `AWS WAF (v2) Web ACL` or an `AWS WAF Classic Web ACL`.
