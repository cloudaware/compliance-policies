# Description

This policy identifies Azure Application Gateways whose Web Application Firewall is not configured with a Bot Manager Rule Set.
Enable bot protection on the Web Application Firewall to block or log requests from known malicious IP addresses identified through the Microsoft Threat Intelligence feed.

## Rationale

Internet traffic from bots can scrape, scan, and search for application vulnerabilities. Enabling bot protection stops requests from known malicious IP addresses and enhances the overall security of your application by reducing exposure to automated attacks.

## Impact

May require monitoring to identify false positives.

## Audit

This policy flags an *Azure Application Gateway* as `INCOMPLIANT` if:

- it has no *WAF Policy* configured, or
- the *WAF Policy* has no managed rule set with the **ruleSetType** of **Microsoft_BotManagerRuleSet**, or
- the **Microsoft_BotManagerRuleSet** has **ruleGroupOverrides** for the **KnownBadBots** ruleGroupName in **Disabled** state.

## Default Value

Bot protection is disabled by default on Azure Application Gateways with Web Application Firewall.

## References

1. <https://learn.microsoft.com/en-us/azure/web-application-firewall/ag/bot-protection-overview>
2. <https://learn.microsoft.com/en-us/azure/web-application-firewall/ag/bot-protection>
3. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway>
4. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway/waf-policy>
5. <https://learn.microsoft.com/en-us/cli/azure/network/application-gateway/waf-policy/managed-rule/rule-set>
