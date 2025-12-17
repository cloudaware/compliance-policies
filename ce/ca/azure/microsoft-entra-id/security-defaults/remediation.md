# Remediation

## From Azure Portal

To enable security defaults in your directory:

1. From Azure Home select the Portal Menu.
2. Browse to `Microsoft Entra ID` > `Properties`.
3. Select `Manage security defaults`.
4. Under `Security defaults`, select `Enabled (recommended)`.
5. Select `Save`.

## From Powershell

```ps
Connect-MgGraph 
-Scopes "Policy.ReadWrite.ApplicationConfiguration" 

Update-MgPolicyIdentitySecurityDefaultEnforcementPolicy 
-IsEnabled $true 
(Get-MgPolicyIdentitySecurityDefaultEnforcementPolicy).IsEnabled
```

## From Azure CLI

```sh
az rest 
    --method patch 
    --url 'https://graph.microsoft.com/v1.0/policies/identitySecurityDefaultsEnforcementPolicy' 
    --body '{"isEnabled":true}' az rest 
    --method get 
    --url 'https://graph.microsoft.com/v1.0/policies/identitySecurityDefaultsEnforcementPolicy' 
    --query "isEnabled"
```
