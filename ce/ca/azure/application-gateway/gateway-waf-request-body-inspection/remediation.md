# Remediation

## From Azure Portal

1. Go to `Application gateways`.
2. Click the name of an application gateway.
3. Under `Settings`, click `Web application firewall`.
4. Under `Associated web application firewall policy`, click the policy name.
5. Under `Settings`, click `Policy settings`.
6. Check the box next to `Enforce request body inspection`.
7. Click `Save`.
8. Repeat steps 1-7 for each application gateway and firewall policy requiring remediation.

## From Azure CLI

For each firewall policy requiring remediation, run the following command to enable request body inspection:

```sh
az network application-gateway waf-policy update --ids <firewall-policy> --policy-settings request-body-check=true
```
