# Description

Private endpoints will secure network traffic from Azure Key Vault to the resources requesting secrets and keys.

## Rationale

Private endpoints will keep network requests to Azure Key Vault limited to the endpoints attached to the resources that are whitelisted to communicate with each other. Assigning the Key Vault to a network without an endpoint will allow other resources on that network to view all traffic from the Key Vault to its destination. In spite of the complexity in configuration, this is recommended for high security secrets.

## Impact

Incorrect or poorly-timed changing of network configuration could result in service interruption. There are also additional costs tiers for running a private endpoint per petabyte or more of networking traffic.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if the related *Azure Private Endpoint Connection* for **Key Vault** is either **not** linked to an existing *Private Endpoint* or its `Service Connection Status` is **not** set to **Approved**.

## Default Value

By default, Private Endpoints are not enabled for any services within Azure.

## References

1. <https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-overview>
2. <https://docs.microsoft.com/en-us/azure/storage/common/storage-private-endpoints>
3. <https://azure.microsoft.com/en-us/pricing/details/private-link/>
4. <https://docs.microsoft.com/en-us/azure/key-vault/general/private-link-service?tabs=portal>
5. <https://docs.microsoft.com/en-us/azure/virtual-network/quick-create-portal>
6. <https://docs.microsoft.com/en-us/azure/private-link/tutorial-private-endpoint-storage-portal>
7. <https://docs.microsoft.com/en-us/azure/bastion/bastion-overview>
8. <https://docs.microsoft.com/azure/dns/private-dns-getstarted-cli#create-an-additional-dns-record>
9. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>

## Additional Information

This recommendation assumes that you have created a Resource Group containing a Virtual Network that the services are already associated with and configured private DNS. A Bastion on the virtual network is also required, and the service to which you are connecting must already have a Private Endpoint. For information concerning the installation of these services, please see the attached documentation.

Microsoft's own documentation lists the requirements as: A Key Vault. An Azure virtual network. A subnet in the virtual network. Owner or contributor permissions for both the Key Vault and the virtual network.
