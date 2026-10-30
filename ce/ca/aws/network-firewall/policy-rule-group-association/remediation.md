# Remediation

## Associate the Network Firewall Policy with a Rule Group

To ensure effective traffic inspection and enforcement, associate the AWS Network Firewall policy with at least one stateless or stateful rule group.

### **From Command Line**

When updating a firewall policy, you must supply the current `UpdateToken` to avoid conflicting updates.

First, retrieve the current update token:

```sh
aws network-firewall describe-firewall-policy \
    --firewall-policy-arn {{policy-arn}} \
    --query UpdateToken \
    --output text
```

### Associate a Stateless Rule Group

```sh
aws network-firewall update-firewall-policy \
    --update-token {{update-token}} \
    --firewall-policy-arn {{firewall-policy-arn}} \
    --firewall-policy '{
        "StatelessRuleGroupReferences": [
            {
                "ResourceArn": "{{stateless-rule-group-arn}}",
                "Priority": 100
            }
        ]
    }'
```

### Associate a Stateful Rule Group

```sh
aws network-firewall update-firewall-policy \
    --update-token {{update-token}} \
    --firewall-policy-arn {{firewall-policy-arn}} \
    --firewall-policy '{
        "StatefulRuleGroupReferences": [
            {
                "ResourceArn": "{{stateful-rule-group-arn}}",
                "Priority": 100
            }
        ]
    }'
```
