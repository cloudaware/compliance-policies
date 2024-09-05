# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Select `Environment Settings` blade.
3. Click on the subscription name.
4. Select the `Defender plans` blade.
5. Click `Select types >` in the row for `Databases`.
6. Set the radio button next to `Open-source relational databases` to `On`.
7. Select `Continue`.
8. Select `Save`.

## From Azure CLI

Run the following command:

```sh
az security pricing create -n 'OpenSourceRelationalDatabases' --tier 'standard'
```

## From PowerShell

Use the below command to enable Standard pricing tier for Open-source relational databases:

```ps
set-azsecuritypricing -name "OpenSourceRelationalDatabases" -pricingtier "Standard"
```
