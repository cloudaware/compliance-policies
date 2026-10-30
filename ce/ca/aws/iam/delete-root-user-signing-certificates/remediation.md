# Remediation

## Disable X.509 Signing Certificates for the AWS Root Account

All active X.509 signing certificates associated with the AWS **root user** must be disabled and removed. The root user should not use X.509 certificates for API or SOAP-based requests.

### **From Command Line**

#### 1. Disable the Active X.509 Certificates

Identify the serial number of the active root signing certificate from the AWS Management Console or internal documentation, then deactivate it using the following command:

```sh
aws iam update-signing-certificate \
    --certificate-id {{certificate-id}} \
    --status Inactive \
    --user-name root
```

Repeat this step for any additional active signing certificates.

#### 2. Delete the X.509 Certificates

Ensure that no applications or legacy integrations rely on root X.509 certificates before deletion:

```sh
aws iam delete-signing-certificate \
    --certificate-id {{certificate-id}} \
    --user-name root
```
