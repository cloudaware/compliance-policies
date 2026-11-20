# Description

Azure Web Application Firewall (WAF) on Azure Front Door inspects incoming HTTP and HTTPS requests at the Microsoft network edge and blocks common exploits before they reach the origin. Ensure every domain served by an Azure Front Door Standard or Premium profile is associated with an enabled WAF policy.

## Rationale

Applications published through Azure Front Door are reachable from the internet, so injection, cross-site scripting, malicious bot, and HTTP flood traffic arrives at the edge first. A WAF policy blocks these requests before they reach the origin, and Microsoft updates its managed rule sets as new attack signatures appear.

## Audit

This requirement needs manual assessment. Front Door security policies, domain associations, and WAF policy links are not collected through a verified CE relationship.
