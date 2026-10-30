# Remediation

## Add Functional Rules to the Stateless Rule Group

To ensure that a stateless rule group provides effective traffic filtering, add one or more functional stateless rules. Stateless rule groups without rules do not enforce any security controls and should be updated or removed.

### **From Command Line**

When updating a stateless rule group, you must provide the current `UpdateToken` to prevent conflicting updates.

First, retrieve the current update token for the rule group:

```sh
aws network-firewall describe-rule-group \
    --rule-group-arn {{rule-group-arn}} \
    --query UpdateToken \
    --output text
```

Next, update the stateless rule group by adding at least one stateless rule:

```sh
aws network-firewall update-rule-group \
    --update-token {{update-token}} \
    --rule-group-arn {{rule-group-arn}} \
    --rule-group '{
        "RulesSource": {
            "StatelessRulesAndCustomActions": {
                "StatelessRules": [
                    {
                        "Priority": 100,
                        "RuleDefinition": {
                            "MatchAttributes": {
                                "Sources": [
                                    { "AddressDefinition": "{{10.0.0.0/8}}" }
                                ]
                            },
                            "Actions": ["{{aws:pass}}"]
                        }
                    }
                ]
            }
        }
    }'
```

**Notes:**

- Ensure that the stateless rules reflect your organization’s security requirements.
- Replace the example rule definition with appropriate rules.
- If a stateless rule group is not required, consider disassociating it from the firewall policy or deleting it to reduce configuration complexity.
