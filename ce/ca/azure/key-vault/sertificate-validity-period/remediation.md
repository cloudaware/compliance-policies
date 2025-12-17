# Remediation

## From Azure Portal

1. Go to `Key vaults`.
2. Click the name of a key vault.
3. Under `Objects`, click `Certificates`.
4. Click the name of a certificate.
5. Click `Issuance Policy`.
6. Set `Validity Period (in months)` to an integer between 1 and 12, inclusive.
7. Click `Save`.
8. Repeat steps 1-7 for each key vault and certificate requiring remediation.

## From PowerShell

For each certificate requiring remediation, run the following command to set `ValidityInMonths` to an integer between 1 and 12, inclusive:

```ps
Set-AzKeyVaultCertificatePolicy `
    -VaultName $vault.VaultName `
    -Name {{certificate-name}} `
    -ValidityInMonths {{validity-in-months}}
```
