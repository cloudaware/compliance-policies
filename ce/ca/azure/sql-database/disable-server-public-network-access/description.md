# Description

Disabling public network access restricts the service from accessing public networks.

## Rationale

A secure network architecture requires carefully constructed network segmentation. Public Network Access tends to be overly permissive and introduces unintended vectors for threat activity.

## Impact

Some architectural consideration may be necessary to ensure that required network connectivity is still made available. No additional cost or performance impact is required to deploy this recommendation.

## Audit

### From Azure Portal

1. Go to `SQL servers`.
2. For each SQL server, under `Security`, click `Networking`.
3. Ensure that `Public network access` is set to `Disable`.

## Default Value

By default, Azure SQL Server's Public network access is set to `Disable`.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-network-security#ns-2-secure-cloud-services-with-network-controls>
2. <https://learn.microsoft.com/en-us/azure/azure-sql/database/connectivity-settings?view=azuresql&tabs=azure-portal#deny-public-network-access>
