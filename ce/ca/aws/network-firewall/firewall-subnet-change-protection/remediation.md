# Remediation

## Enable Subnet Change Protection for the Firewall

To prevent accidental or unauthorized modifications to the firewall’s subnet associations, enable **Subnet Change Protection**.

### **From Command Line**

Run the following command to enable subnet change protection:

```sh
aws network-firewall update-subnet-change-protection \
    --firewall-arn {{firewall-arn}} \
    --subnet-change-protection
```

> Once enabled, any attempt to modify the firewall’s subnet associations requires that subnet change protection be explicitly disabled first.
