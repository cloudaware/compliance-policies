# Remediation

## Update the Stateless Default Action

To prevent stateless traffic from bypassing inspection, update the AWS Network Firewall policy to use a secure stateless default action, such as forwarding unmatched traffic to the stateful engine.

### **From Command Line**

When updating a firewall policy, you must provide the current `UpdateToken` to avoid conflicting changes.

First, retrieve the current update token:

```sh
aws network-firewall describe-firewall-policy \
    --firewall-policy-arn {{firewall-policy-arn}} \
    --query UpdateToken \
    --output text
```

Next, update the firewall policy to set secure stateless default actions:

```sh
aws network-firewall update-firewall-policy \
    --update-token {{update-token}} \
    --firewall-policy-arn {{firewall-policy-arn}} \
    --firewall-policy '{
        "StatelessDefaultActions": ["aws:forward_to_sfe"],
        "StatelessFragmentDefaultActions": ["aws:forward_to_sfe"]
    }'
```

> Alternatively, you may use `aws:drop` to block unmatched stateless traffic, depending on your security requirements.
