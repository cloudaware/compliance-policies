# Remediation

## From Command Line

Perform one of the following commands to renew the expiring certificate:

- request a new managed private certificate
- reimport a new externally obtained certificate
- issue a client certificate using private CA:

### Request a new private certificate

```sh
aws acm request-certificate \
--domain-name {{www.example.com}} \
--idempotency-token {{12563}} \
--certificate-authority-arn {{certificateAuthorityArn}}
```

**Note**: If you do not provide a `{{certificateAuthorityArn}}` and you are trying to request a private certificate, ACM will attempt to issue a public certificate.

### Reimport a new certificate

```sh
aws acm import-certificate \
--certificate-arn {{certificateArn}} \
--certificate file://{{importedCertificate}} \
--private-key file://{{privateKey}} \
--certificate-chain file://{{certificateChain}}
```

Replace `{{certificateArn}}`, `{{importedCertificate}}`, `{{privateKey}}`, and `{{certificateChain}}` with the respective ARN value and file paths of your imported certificate, private key, and certificate chain files.

### Issue private end-entity certificate

Before issuing a private end-entity certificate, you need to generate a `Certificate Signing Request` (CSR). You can do this using OpenSSL with the following command:

```sh
openssl req -out {{csr.pem}} -new -newkey rsa:2048 -nodes -keyout private-key.pem
```

Once you have the CSR, you can issue a base end-entity certificate:

```sh
aws acm-pca issue-certificate \
--certificate-authority-arn {{certificateAuthorityArn}} \
--csr fileb://{{csr.pem}} \
--signing-algorithm {{SHA256WITHRSA}} \
--validity Value={{365}},Type={{DAYS}}
```
