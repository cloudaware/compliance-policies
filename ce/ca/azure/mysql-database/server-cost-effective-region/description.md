# Description

This policy identifies Azure MySQL Database that are provisioned in Azure regions known to have higher pricing compared to nearby alternatives.

## Rationale

Selecting the appropriate Azure region is essential for optimizing both cost and performance. Service pricing can vary across regions due to factors such as infrastructure expenses, energy costs, and local taxes. Deploying workloads in cost-efficient regions can result in substantial savings on monthly Azure expenditures.

## Impact

Migrating workloads to different regions requires careful planning to avoid service disruptions and to ensure latency, compliance, and data sovereignty requirements continue to be met.

## Audit

This policy flags an *Azure MySQL Database* as `INCOMPLIANT` if it is **running** in one of the following regions identified as less cost-efficient:

| Region                                         | Recommended Alternative                 |
| ---------------------------------------------- | --------------------------------------- |
| `westus`,<br>`westcentralus`                   | `westus3`, `westus2`                    |
| `southcentralus`,<br>`centralus`               | `northcentralus`, `westus3`, `westus2`  |
| `canadaeast`,<br>`canadacentral`               | `eastus`, `eastus2`                     |
| `ukwest`,<br>`uksouth`,<br>`francecentral`,<br>`francesouth`,<br>`westeurope`,<br>`austriaeast`,<br>`germanywestcentral`,<br>`germanynorth`,<br>`switzerlandnorth`,<br>`switzerlandwest`,<br>`italynorth`,<br>`polandcentral`,<br>`norwayeast`,<br>`norwaywest`,<br>`swedensouth`,<br>`spaincentral`| `swedencentral`, `northeurope`|
| `australiasoutheast`,<br>`australiaeast`       | `australiacentral`, `australiacentral2` |
| `japaneast`,<br>`japanwest`,<br>`koreacentral` | `koreasouth`                            |
