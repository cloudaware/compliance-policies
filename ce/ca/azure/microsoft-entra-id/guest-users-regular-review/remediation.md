# Remediating

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Users`.
4. Click on `Add filter`.
5. Select `User type`.
6. Select `Guest` from the Value dropdown.
7. Click `Apply`.
8. Check the box next to all `Guest` users that are no longer required or are inactive.
9. Click `Delete`.
10. Click `OK`.

## From Azure CLI

Before deleting the user, set it to inactive using the ID from the Audit Procedure to determine if there are any dependent systems:

```sh
az ad user update --id <exampleaccountid@domain.com> --account-enabled {false}
```

After determining that there are no dependent systems delete the user:

```sh
Remove-AzureADUser -ObjectId <exampleaccountid@domain.com>
```

## From Azure PowerShell

Before deleting the user, set it to inactive using the ID from the Audit Procedure to determine if there are any dependent systems:

```ps
Set-AzureADUser -ObjectId "<exampleaccountid@domain.com>" -AccountEnabled false
```

After determining that there are no dependent systems delete the user:

```ps
PS C:\>Remove-AzureADUser -ObjectId <exampleaccountid@domain.com>
```
