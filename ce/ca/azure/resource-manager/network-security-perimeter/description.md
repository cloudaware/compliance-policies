# Description

Azure Network Security Perimeter creates a logical boundary around Azure platform-as-a-service (PaaS) resources outside of virtual networks. By default, the network security perimeter denies public access to associated PaaS resources, with the ability to define explicit rules for inbound and outbound traffic.

While an automated assessment procedure exists for this recommendation, the assessment status remains manual. Determining appropriate network security perimeter profiles and resource assignments depends on the context and requirements of each organization and environment.

## Rationale

Network security perimeter denies public access to PaaS resources, reducing exposure and mitigating data exfiltration risks.

## Impact

Implementation requires administrative effort to configure and maintain network security perimeter profiles and resource assignments. Azure does not list any additional charges for using network security perimeters.

## Audit

### From Azure Portal

1. Go to `Resource groups`.
2. Click the name of a resource group.
3. Take note of PaaS resources.
4. Go to `Network Security Perimeters`.
5. Click the name of a network security perimeter.
6. Under `Settings`, click `Associated resources`.
7. Take note of the associated resources.
8. Repeat steps 1-7 and ensure each PaaS resource is associated with a network security perimeter.

### From Azure CLI

Run the following command to list resource groups:

```sh
az group list
```

For each resource group, run the following command to list resources:

```sh
az resource list --resource-group <resource-group>
```

Take note of PaaS resources.

For each resource group, run the following command to list network security perimeters:

```sh
az network perimeter list --resource-group <resource-group>
```

For each network security perimeter, run the following command to list resources:

```sh
az network perimeter association list --resource-group <resource-group> --perimeter-name <network-security-perimeter>
```

Ensure each PaaS resource is associated with a network security perimeter.

## Default Value

PaaS resources are not associated with a network security perimeter by default.

## References

1. <https://learn.microsoft.com/en-us/azure/private-link/network-security-perimeter-concepts>
2. <https://learn.microsoft.com/en-us/azure/private-link/create-network-security-perimeter-portal>
3. <https://learn.microsoft.com/en-us/cli/azure/group>
4. <https://learn.microsoft.com/en-us/cli/azure/resource>
5. <https://learn.microsoft.com/en-us/cli/azure/network/perimeter>

## Additional Information

The current list of resources that can be associated with a network security perimeter are as follows:

- Azure Monitor
- Azure AI Search
- Cosmos DB
- Event Hubs
- Key Vault
- SQL DB
- Storage
- Azure OpenAI Service

While network security perimeter is generally available, Cosmos DB, SQL DB, and Azure OpenAI Service are in public preview.
