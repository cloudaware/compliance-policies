# Remediation

## Create a Default-Deny Egress Firewall Rule

Creating a firewall rule that denies all egress traffic ensures that no outbound connections are allowed unless explicitly permitted by higher-priority rules.

### **From gcloud CLI**

    ```sh
    gcloud compute firewall-rules create {{firewall-rule-name}} \
        --network={{network-name}} \
        --action=DENY \
        --direction=EGRESS \
        --priority=65534 \
        --rules=all \
        --destination-ranges=0.0.0.0/0 \
        --enable-logging
    ```

**Notes:**

* The `priority` is set high (65534) to ensure it acts as a default-deny rule, allowing higher-priority rules to override it.
* `--enable-logging` is optional but recommended for audit and troubleshooting purposes.
