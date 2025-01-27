# Remediation

## From Command Line

### Manage Detailed Monitoring

- Run the following command to enable detailed monitoring for a specific EC2 instance:

```sh
aws ec2 monitor-instances --instance-ids {{instance-id}}
```

Replace `{{instance-id}}` with the ID of the instance you want to enable detailed monitoring for.

- To enable detailed monitoring for multiple instances simultaneously, use a space-separated list of instance IDs:

```sh
aws ec2 monitor-instances --instance-ids {{instance-id-1}} {{instance-id-2}} {{instance-id-3}}
```

- If you need to revert back to basic monitoring, use the following command:

```sh
aws ec2 unmonitor-instances --instance-ids {{instance-id}}
```
