# Remediation

## Deallocate the Unused Public IP Address

If a Public IP Address is confirmed to be unused and not required by any current or planned service, it should be deleted to prevent ongoing charges and reduce the potential network exposure.

### Azure CLI

```sh
az network public-ip delete \
    --resource-group {{resource-group-name}} \
    --name {{public-ip-name}}
```

### PowerShell

```ps
Remove-AzPublicIpAddress `
    -Name "{{public-ip-name}}" `
    -ResourceGroupName "{{resource-group-name}}"
```

## Considerations

- Ensure that the Public IP Address is not reserved for future use or linked to a pending deployment. Accidental deletion may cause disruption to planned services.
- If the Public IP was recently detached due to the deletion of a dependent resource, verify that the resource removal was intentional and permanent.
