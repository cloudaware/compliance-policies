# Remediation

## From Command Line

Perform the following command to remove the wildcard certificate:

```sh
aws acm delete-certificate --certificate-arn {{certificateARN}}
```

Replace `{{certificateARN}}` with the ARN of the wildcard certificate you want to remove.
