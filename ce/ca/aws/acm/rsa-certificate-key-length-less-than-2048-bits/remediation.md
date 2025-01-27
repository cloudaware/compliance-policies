# Remediation

It is not possible to change the key length of a certificate after it has been imported. Instead, delete certificates with a key length smaller than 2,048 bits.

**Note**: You cannot delete an ACM certificate that is in use by another AWS service. To delete such a certificate, you must first remove its association with the service.

## From Command Line

Use the `delete-certificate` command to remove a certificate:

```sh
aws acm delete-certificate --certificate-arn {{certificate-arn}}
```
