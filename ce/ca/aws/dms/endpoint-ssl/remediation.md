# Remediation

## From Command Line

### Import the CA Certificate into DMS

If you do not yet have your CA certificate registered with DMS, import it first:

```sh
aws dms import-certificate \
    --certificate-identifier {{cert-identifier}} \
    --certificate-pem file://{{path-to-cert}}.pem
```

Sample output:

```json
{
  "Certificate": {
    "CertificateIdentifier": "{{cert-identifier}}",
    "CertificateCreationDate": "2025-07-11T18:00:00Z",
    "CertificateArn": "{{cert-arn}}"
  }
}
```

Note the `{{cert-arn}}` for use in the next step.

### Enable SSL on the Endpoint

```sh
aws dms modify-endpoint \
    --endpoint-arn {{endpoint-arn}} \
    --ssl-mode require \
    --certificate-arn {{cert-arn}}
```

`--ssl-mode`: Choose one of `require`, `verify-ca`, or `verify-full` according to your security requirements.

### Test the Endpoint Connection

```sh
aws dms test-connection \
    --replication-instance-arn {{replication-instance-arn}} \
    --endpoint-arn {{endpoint-arn}}
```
