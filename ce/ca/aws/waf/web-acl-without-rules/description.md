# Description

This policy identifies AWS WAF Web ACLs that do not have any associated rules or rule groups. Such Web ACLs are not actively enforcing security controls and may leave web applications unprotected.

## Rationale

Web ACLs are the enforcement boundary for AWS WAF. When a Web ACL has no rules or rule groups, it does not inspect traffic and provides no mitigation. Ensuring every Web ACL has at least one active rule or rule group helps maintain consistent security coverage and reduces protection gaps.

## Audit

This policy flags an *AWS WAF Web ACL* as `INCOMPLIANT` if it does not have any associated *AWS WAF Rules*, *AWS WAF Rule Groups*, or *AWS WAF Web ACL Activated Rule*
