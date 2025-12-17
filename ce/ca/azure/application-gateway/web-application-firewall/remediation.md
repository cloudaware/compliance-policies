# Remediation

**Note**: `Basic` tier application gateways cannot be upgraded to the `WAF V2` tier. Create a new `WAF V2` tier application gateway to replace a `Basic` tier application gateway.

## From Azure Portal

To remediate a `Standard V2` tier application gateway:

1. Go to `Application gateways`.
2. Click `Add filter`.
3. From the `Filter` drop-down menu, select `SKU size`.
4. Check the box next to `Standard_v2` only.
5. Click `Apply`.
6. Click the name of an application gateway.
7. Under `Settings`, click `Web application firewall`.
8. Under `Configure`, next to `Tier`, click `WAF V2`.
9. Select an existing or create a new `WAF policy`.
10. Click `Save`.
11. Repeat steps 1-10 for each `Standard V2` tier application gateway requiring remediation.
