# Remediation

## From Command Line

You can associate an IAM OpenID Connect (OIDC) identity provider with your Amazon EKS cluster using the `eksctl` CLI tool.

### Retrieve the OIDC Issuer URL

First, obtain the OIDC issuer URL for your cluster. Replace `{{cluster-name}}` with the name of your EKS cluster:

```sh
cluster_name={{cluster-name}}
oidc_url=$(aws eks describe-cluster \
    --name "$cluster_name" \
    --query "cluster.identity.oidc.issuer" \
    --output text)

echo "$oidc_url"
```

### Associate the IAM OIDC Provider

Use `eksctl` to create an IAM OIDC provider for the EKS cluster:

```sh
eksctl utils associate-iam-oidc-provider \
    --cluster "$cluster_name" \
    --approve
```
