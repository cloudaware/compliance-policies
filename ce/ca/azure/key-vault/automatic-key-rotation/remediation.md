# Remediation

**Note:** Azure CLI and PowerShell use the ISO8601 duration format for time spans. The format is `P<timespanInISO8601Format>(Y,M,D)`. The leading P is required and is referred to as `period`. The `(Y,M,D)` are for the duration of Year, Month, and Day, respectively. A time frame of 2 years, 2 months, 2 days would be `P2Y2M2D`. For Azure CLI and PowerShell, it is easiest to supply the policy flags in a `.json file`, for example:

```json
{ 
    "lifetimeActions": [ 
        { 
            "trigger": { 
                "timeAfterCreate": "P<timespanInISO8601Format>(Y,M,D)",
                "timeBeforeExpiry" : null 
            }, 
            "action": { 
                "type": "Rotate" 
            } 
        }, 
        { 
            "trigger": { 
                "timeBeforeExpiry" : "P<timespanInISO8601Format>(Y,M,D)" 
            }, 
            "action": { 
                "type": "Notify" 
                } 
        } 
    ], 
    "attributes": { 
        "expiryTime": "P<timespanInISO8601Format>(Y,M,D)" 
    } 
}
```

## From Azure Portal

1. Go to `Key Vaults`.
2. Select a Key Vault.
3. Under `Objects`, select `Keys`.
4. Select a key.
5. From the top row, select `Rotation policy`.
6. Select an appropriate `Expiry time`.
7. Set `Enable auto rotation` to `Enabled`.
8. Set an appropriate `Rotation option` and `Rotation time`.
9. Optionally, set a `Notification time`.
10. Click `Save`.
11. Repeat steps 1-10 for each Key Vault and Key.

## From Azure CLI

Run the following command for each key to enable automatic rotation:

```sh
az keyvault key rotation-policy update --vault-name <vault-name> --name <key-name> --value <path/to/policy.json>
```

## From PowerShell

Run the following command for each key to enable automatic rotation:

```ps
Set-AzKeyVaultKeyRotationPolicy -VaultName <vault-name> -Name <key-name> -PolicyPath <path/to/policy.json>
```
