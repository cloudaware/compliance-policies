# Remediation

## Enable Delete Protection for the Firewall

To prevent accidental or unauthorized deletion, enable **Delete Protection** on the AWS Network Firewall.

### **From Command Line**

Run the following command to enable delete protection:

```bash
aws network-firewall update-firewall-delete-protection \
    --firewall-arn {{firewall-arn}} \
    --delete-protection-enabled
```

> Once enabled, delete protection must be explicitly disabled before the firewall can be deleted.
