# Remediation

## From Azure Portal

1. Go to `Virtual network gateways`.
2. Under `VPN gateway`, click `VPN gateways`.
3. Click the name of a VPN gateway.
4. Under `Settings`, click `Point-to-site configuration`.
5. Ensure `Authentication type` click to expand the drop-down menu.
6. Check the box next to `Azure Active Directory`, and uncheck the boxes next to `Azure certificate` and `RADIUS authentication`.
7. Provide a `Tenant`, `Audience`, and `Issuer` for the `Azure Active Directory` configuration.
8. Click `Save`.
9. Repeat steps 1-8 for each VPN gateway requiring remediation.
