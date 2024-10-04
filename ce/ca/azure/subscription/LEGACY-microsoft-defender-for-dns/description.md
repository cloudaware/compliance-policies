# Description

[**NOTE**: As of August 1, 2023 customers with an existing subscription to Defender for DNS can continue to use the service, but new subscribers will receive alerts about suspicious DNS activity as part of Defender for Servers P2.]

Microsoft Defender for DNS scans all network traffic exiting from within a subscription.

## Rationale

DNS lookups within a subscription are scanned and compared to a dynamic list of websites that might be potential security threats. These threats could be a result of a security breach within your services, thus scanning for them could prevent a potential security threat from being introduced.

## Impact

Enabling Microsoft Defender for DNS requires enabling Microsoft Defender for your subscription. Both will incur additional charges, with Defender for DNS being a small amount per million queries.

## Audit

### From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`
3. Click on the subscription name
4. Select the `Defender plans` blade
5. Ensure `Status` is set to `On` for `DNS`.

### From Azure CLI

Ensure the output of the below command is `Standard`:

```sh
az security pricing show -n 'DNS' --query 'PricingTier'
```

### From PowerShell

```ps
Get-AzSecurityPricing --Name 'DNS' | Select-Object Name,PricingTier
```

Ensure output of `PricingTier` is `Standard`.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [bdc59948-5574-49b3-bb91-76b7c986428d](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fbdc59948-5574-49b3-bb91-76b7c986428d) - **Name**: `Azure Defender for DNS should be enabled`

## Default Value

By default, Microsoft Defender for DNS is not enabled.

## References

1. <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/>
2. <https://docs.microsoft.com/en-us/security/benchmark/azure/baselines/dns-security-baseline>
3. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/defender-for-dns-alerts>
4. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/enable-enhanced-security>
5. <https://docs.microsoft.com/en-us/azure/defender-for-cloud/alerts-overview>
6. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-network-security#ns-10-ensure-domain-name-system-dns-security>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>

## Additional Information

[**NOTE**: As of August 1, 2023 customers with an existing subscription to Defender for DNS can continue to use the service, but new subscribers will receive alerts about suspicious DNS activity as part of Defender for Servers P2.]
