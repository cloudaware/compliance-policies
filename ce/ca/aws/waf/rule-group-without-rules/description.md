# Description

This policy identifies AWS WAF rule groups that contain zero rules. Rule groups are reusable collections of WAF rules that you attach to Web ACLs to standardize request inspection across applications and environments. An empty rule group performs no inspection or filtering and therefore provides no protection.

## Rationale

An empty rule group usually indicates an incomplete or abandoned configuration. Retaining unused resources increases configuration drift and can create a false sense of coverage if engineers assume the rule group is active. It also adds operational overhead during reviews and audits.

## Audit

This policy flags an *AWS WAF Rule Group* as `INCOMPLIANT` if it does not have any associated *AWS WAF Rules*.
