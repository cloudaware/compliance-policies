# Description

Enable only 'Azure Active Directory' (Microsoft Entra ID) authentication for Azure VPN Gateway point-to-site connections.

## Rationale

Microsoft Entra ID authentication provides strong security and centralized identity management, and reduces risks associated with static credentials and certificate management.

## Impact

Azure VPN Gateways incur hourly charges, with additional costs for point-to-site connections and data transfer. Pricing varies by SKU and usage. Refer to <https://azure.microsoft.com/en-us/pricing/details/vpn-gateway/> for details.

## Audit

### From Azure Portal

1. Go to `Virtual network gateways`.
2. Under `VPN gateway`, click `VPN gateways`.
3. Click the name of a VPN gateway.
4. Under `Settings`, click `Point-to-site configuration`.
5. Ensure `Authentication type` is set to `Azure Active Directory` only.
6. Repeat steps 1-5 for each VPN gateway.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- Policy ID: [21a6bc25-125e-4d13-b82d-2e19b7208ab7](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F21a6bc25-125e-4d13-b82d-2e19b7208ab7) - **Name**: `VPN gateways should use only Azure Active Directory (Azure AD) authentication for point-to-site users`
