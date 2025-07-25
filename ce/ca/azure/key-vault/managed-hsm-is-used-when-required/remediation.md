# Remediation

## From Azure CLI

Run the following command to set `oid` to be the `OID` of the signed-in user:

```sh
$oid = az ad signed-in-user show --query id -o tsv
```

Alternatively, prepare a space-separated list of OIDs to be provided as the `administrators` of the HSM.

Run the following command to create a Managed HSM:

```sh
az keyvault create --resource-group <resource-group> --hsm-name <hsm-name> --retention-days <retention-days> --administrators $oid
```

The command can take several minutes to complete.

After the HSM has been created, it must be activated before it can be used. Activation requires providing a minimum of three and a maximum of ten RSA key pairs, as well as the minimum number of keys required to decrypt the security domain (called a quorum). OpenSSL can be used to generate the self-signed certificates, for example:

```sh
openssl req -newkey rsa:2048 -nodes -keyout cert_1.key -x509 -days 365 -out cert_1.cer
```

Run the following command to download the security domain and activate the Managed HSM:

```sh
az keyvault security-domain download --hsm-name <managed-hsm> --sd-wrapping-keys <key-1> <key-2> <key-3> --sd-quorum <quorum> --security-domain-file <managed-hsm-security-domain>.json
```

Store the security domain file and the RSA key pairs securely. They will be required for disaster recovery or for creating another Managed HSM that shares the same security domain so that the two can share keys.

The Managed HSM will now be in an active state and ready for use.
