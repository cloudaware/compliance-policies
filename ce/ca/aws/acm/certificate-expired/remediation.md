# Remediation

## From Command Line

Perform one of the following commands to request a new managed certificate, import a new externally obtained certificate, or remove the expired ACM certificate via the AWS CLI:

### Request a new public certificate

```sh
aws acm request-certificate \
--domain-name {{www.example.com}} \
--key-algorithm {{RSA_2048}} \
--validation-method {{DNS}} \
--idempotency-token {{1234}} \
--options CertificateTransparencyLoggingPreference=DISABLED
```

**Note**: If you are requesting a public certificate, each domain name that you specify must be validated to verify that you own or control the domain.

### Request a new private certificate

```sh
aws acm request-certificate \
--domain-name {{www.example.com}} \
--idempotency-token {{12563}} \
--certificate-authority-arn {{certificateAuthorityArn}}
```

**Note**: If you do not provide a `{{certificateAuthorityArn}}` and you are trying to request a private certificate, ACM will attempt to issue a public certificate.

### Import a new certificate

```sh
aws acm import-certificate \
--certificate file://{{importedCertificate}} \
--private-key file://{{privateKey}} \
--certificate-chain file://{{certificateChain}}
```

Replace `{{importedCertificate}}`, `{{privateKey}}`, and `{{certificateChain}}` with the respective file paths of your imported certificate, private key, and certificate chain files.

### To remove a certificate

```sh
aws acm delete-certificate --certificate-arn {{certificateARN}}
```

Replace `{{certificateARN}}` with the ARN of the expired certificate you want to remove.
