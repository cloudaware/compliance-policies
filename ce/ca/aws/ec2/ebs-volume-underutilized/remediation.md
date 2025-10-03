# Remediation

Before downsizing, review historical performance metrics to ensure the volume can safely operate at a lower IOPS. Modifying volumes may cause temporary I/O latency.

## Downsize the Volume

```bash
aws ec2 modify-volume \
    --volume-id {{volume-id}} \
    --volume-type {{volume-type}} \
    --iops {{3000}}
```

### Verify Performance After Downsizing

Monitor CloudWatch metrics to ensure the downsized volume continues to meet performance requirements.
