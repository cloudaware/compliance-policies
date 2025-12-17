# Remediation

## From Azure Portal

1. Go to `Application gateways`.
2. Click the name of an application gateway.
3. Under `Settings`, click `Web application firewall`.
4. Under `Associated web application firewall policy`, click the policy name.
5. Under `Settings`, click `Managed rules`.
6. Click `Assign`.
7. Under `Bot Management ruleset`, click to display the drop-down menu.
8. Select a `Microsoft_BotManagerRuleSet`.
9. Click `Save`.
10. Click `X` to close the panel.
11. Repeat steps 1-10 for each application gateway and firewall policy requiring remediation.

## From Azure CLI

For each firewall policy requiring remediation, run the following command to enable bot protection:

```sh
az network application-gateway waf-policy managed-rule rule-set add 
--resource-group {{resource-group}} 
--policy-name {{firewall-policy}} 
--type Microsoft_BotManagerRuleSet 
--version {{0.1|1.0|1.1}}
```
