# Remediation

Perform one of the following commands to renew, re-import or remove the expired ACM certificate via the AWS CLI:

To renew a certificate:

```sh
renew-certificate --certificate-arn {{certificateARN}}
```

To re-import a certificate:

```sh
import-certificate --certificate-arn {{certificateARN}} --certificate {{importedCertificate}} --private-key {{privateKey}}
```

To remove a certificate:

```sh
delete-certificate --certificate-arn {{certificateARN}}
```
