# Description

Associate AWS API Gateway REST API stages with a WAF Web ACL to provide enhanced security against web application threats. AWS WAF is a web application firewall designed to block, allow, or count web requests based on customizable rules and security conditions that you configure. Linking your API Gateway stages to an AWS WAF Web ACL helps safeguard APIs from common exploits such as SQL injection and cross-site scripting (XSS), and other malicious activity targeting your APIs.

## Rationale

Configuring AWS WAF Web ACLs for API Gateway stages improves security posture by implementing rule-based traffic filtering. This measure defends against automated attacks, unauthorized access, and other malicious web activities. It also enables security teams to monitor and audit traffic patterns, allowing proactive adjustments to security rules. Without a WAF Web ACL in place, APIs are vulnerable to various attack vectors that could lead to unauthorized access, data breaches, and service disruption.

## Impact

AWS WAF pricing includes charges for the number of Web ACLs created, the number of rules within those ACLs, and the volume of web requests inspected. It is essential to evaluate the anticipated traffic and associated costs to ensure alignment with your budget and usage expectations.

## Audit

This policy marks an *API Gateway Stage* as `INCOMPLIANT` if the `Web ACL ARN` field is **empty**, indicating that the stage is not associated with a WAF Web ACL.
