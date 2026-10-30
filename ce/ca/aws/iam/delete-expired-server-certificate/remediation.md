# Remediation

## From Console

Removing expired certificates via the AWS Management Console is not currently supported. To delete SSL/TLS certificates stored in IAM via the AWS API, use the Command Line Interface (CLI).

## From Command Line

To delete an expired certificate, run the following command and replace `{{CERTIFICATE_NAME}}` with the name of the certificate to delete:

```sh
aws iam delete-server-certificate --server-certificate-name {{CERTIFICATE_NAME}}
```

When the preceding command is successful, it does not return any output.
