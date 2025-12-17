# Description

This policy identifies Azure Storage Accounts that are provisioned in Azure regions known to have higher pricing compared to nearby alternatives.

## Rationale

Selecting the appropriate Azure region is essential for optimizing both cost and performance. Service pricing can vary across regions due to factors such as infrastructure expenses, energy costs, and local taxes. Deploying workloads in cost-efficient regions can result in substantial savings on monthly Azure expenditures.

## Impact

Migrating workloads to different regions requires careful planning to avoid service disruptions and to ensure latency, compliance, and data sovereignty requirements continue to be met.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if it is **running** in one of the following regions identified as less cost-efficient:

| Region                                        | Recommended Alternative                  |
| --------------------------------------------- | ---------------------------------------- |
| `westus`                                      | `westus3`, `westus2`, `westcentralus`    |
| `northcentralus`                              | `centralus`, `eastus2`                   |
| `southcentralus`                              | `westus3`, `westus2`                     |
| `canadaeast`,<br>`canadacentral`,<br>`eastus` | `eastus2`                                |
| `ukwest`,<br>`uksouth`,<br>`francecentral`,<br>`francesouth`,<br>`westeurope`,<br>`northeurope`,<br>`germanywestcentral`,<br>`germanynorth`,<br>`switzerlandnorth`,<br>`switzerlandwest`,<br>`italynorth`,<br>`polandcentral`,<br>`norwayeast`,<br>`norwaywest`,<br>`spaincentral`|`swedencentral`, `swedensouth`|
| `southindia`,<br>`westindia`                  | `centralindia`                           |
| `australiasoutheast`,<br>`australiacentral2`  | `australiaeast`                          |
| `koreasouth`                                  | `japaneast`, `japanwest`, `koreacentral` |
