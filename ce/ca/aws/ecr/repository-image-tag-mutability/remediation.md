# Remediation

## Configure Image Tag Mutability

Setting image tags to immutable helps prevent accidental overwrites of container images, enhancing security and ensuring consistency in your deployments.

### **From AWS CLI**

```bash
aws ecr put-image-tag-mutability \
    --repository-name {{repository-name}} \
    --image-tag-mutability {{IMMUTABLE | IMMUTABLE_WITH_EXCLUSION | MUTABLE_WITH_EXCLUSION}} \
    --image-tag-mutability-exclusion-filters filterType=WILDCARD,filter=latest
```

- `IMMUTABLE_WITH_EXCLUSION`: Prevents overwrites except for specified exclusions.
- `MUTABLE_WITH_EXCLUSION`: Allows overwrites but can make certain tags immutable.
