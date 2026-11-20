# Remediation

Azure Web Application Firewall (WAF) on Azure Front Door inspects incoming HTTP and HTTPS requests at the Microsoft network edge and blocks common exploits before they reach the origin. Ensure every domain served by an Azure Front Door Standard or Premium profile is associated with an enabled WAF policy.

Create or select an enabled WAF policy that matches the Front Door profile tier, configure the required rules, and associate it with every domain in the profile. Verify each domain association and test application traffic after applying the policy.

Automated assessment is unavailable: Front Door security policies, domain associations, and WAF policy links are not collected through a verified CE relationship.
