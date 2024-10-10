# Remediation

To grant the permissions required to enable Security Hub, attach the Security Hub managed policy `AWSSecurityHubFullAccess` to an IAM user, group, or role. Enabling Security Hub

## From Console

1. Use the credentials of the IAM identity to sign in to the Security Hub console.
2. When you open the Security Hub console for the first time, choose `Go to Security Hub`.
3. The `Security standards` section on the welcome page lists supported security standards. Check the box for a standard to enable it.
4. Choose `Enable Security Hub`.

## From Command Line

1. Run the `enable-security-hub` command. To enable the default standards, include `--enable-default-standards`:

```sh
aws securityhub enable-security-hub --enable-default-standards
```

2. To enable the security hub without the default standards, include `--no-enable-default-standards`:

```sh
aws securityhub enable-security-hub --no-enable-default-standards
```
