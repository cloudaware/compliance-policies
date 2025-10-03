# Remediation

Evaluate whether the Elastic IP is still needed:

- If the EIP is required for future use, ensure it is associated with the appropriate EC2 instance or network interface.
- If the EIP is no longer needed, release it to stop incurring charges and reduce potential security risks.

## Release the Elastic IP

### From Command Line

```sh
aws ec2 release-address --allocation-id {{allocation-id}}
```
