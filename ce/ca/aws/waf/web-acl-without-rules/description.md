# Description

This policy identifies AWS WAF Web ACLs that do not have any associated rules or rule groups. Such Web ACLs are not actively enforcing security controls and may leave web applications unprotected.

## Rationale

Web ACLs are a key part of AWS WAF security. They examine incoming web requests and take actions based on defined rules, such as allowing, blocking, or counting requests. When a Web ACL has no rules or rule groups, it does not inspect any traffic. As a result, the web applications associated with that Web ACL remain unprotected.

Ensuring that every Web ACL has at least one active rule or rule group helps maintain consistent security coverage and prevents gaps in protection.

## Audit

This policy flags an *AWS WAF Web ACL* as `INCOMPLIANT` if it does not have any associated *AWS WAF Rules*, *AWS WAF Rule Groups*, or *AWS WAF Web ACL Activated Rule*
