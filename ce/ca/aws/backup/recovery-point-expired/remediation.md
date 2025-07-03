# Remediation

## From Command Line

Execute the following AWS CLI command to remove an expired recovery point:

```sh
aws backup delete-recovery-point \
    --backup-vault-name {{backup-vault-name}} \
    --recovery-point-arn {{recovery-point-arn}} \
```

## Troubleshooting Lifecycle Failures

Below are a few common scenarios to investigate when expired recovery points remain in the vault.

- If the IAM policy or execution role associated with your backup plan was modified or removed, AWS Backup may lack permission to call DeleteRecoveryPoint.
- An active “Retain” lock on an underlying Amazon EBS snapshot can prevent lifecycle deletion.
- Updates to lifecycle rules or IAM roles apply only to new recovery points.

### Verifying Status in the Console

The target recovery points display as **Expired** in the AWS Backup Console. Hover over the **Expired** status to see a tooltip explaining the failure reason.
