# Remediation

Verify the API inventory directly in Azure before changing or deleting the service.

## From Azure Portal

1. Open **API Management services**.
2. Select the affected service.
3. Under **APIs**, confirm that no APIs are listed.

If APIs exist in Azure but are absent from Cloudaware CMDB, investigate collection
permissions or synchronization before proceeding.

## From Azure CLI

Run the following command:

```sh
az apim api list \
  --resource-group <resource-group-name> \
  --service-name <api-management-service-name>
```

An empty result confirms that Azure currently reports no APIs for the service.

## Review and Remediate

1. Confirm the service owner and verify that no API deployment is planned.
2. Review custom domains, DNS records, networking, private endpoints, identities,
   certificates, named values, policies, diagnostic settings, and automation that
   references the service.
3. If the service is unused, delete it through the approved change process.
4. If the service is reserved for planned use or retains required dependencies,
   document the owner, justification, and expected review date as an exception.
5. If APIs are still required, deploy or migrate them before removing the empty
   service.

Document a rollback or recovery plan before the change. After deletion or migration,
validate routing, DNS, authentication, monitoring, and policy behavior.
