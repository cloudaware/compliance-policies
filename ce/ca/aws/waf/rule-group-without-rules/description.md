# Description

This policy identifies AWS WAF Rule Groups that do not contain any rules. A rule group is a reusable collection of rules that can be added to a Web ACL to help manage and apply consistent web request filtering across applications. A rule group without any rules does not perform any inspection or filtering and therefore provides no protection.

## Rationale

An empty rule group typically indicates an incomplete configuration or a resource that was created but never fully implemented. Keeping such unused resources can create configuration drift, increase management complexity, and lead to a false sense of security if administrators assume the rule group is active and providing protection when it is not.

## Audit

This policy flags an *AWS WAF Rule Group* as `INCOMPLIANT` if it does not have any associated *AWS WAF Rules*.
