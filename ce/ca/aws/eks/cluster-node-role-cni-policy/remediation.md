# Remediation

Configure a dedicated IAM role for the Amazon VPC CNI plugin's `aws-node` service account using **IAM Roles for Service Accounts (IRSA)**. This limits the CNI pods to only the permissions granted by the `AmazonEKS_CNI_Policy`, aligning with the principle of least privilege.

## Prerequisites

- The EKS cluster must have an IAM OIDC identity provider associated with it.

## From Command Line

### Create a Dedicated IAM Role for `aws-node` Using `eksctl`

The command creates and deploys an AWS CloudFormation stack that creates an IAM role, attaches the necessary policy, and annotates the existing `aws-node` Kubernetes service account in the `kube-system` namespace with the role's ARN:

```sh
eksctl create iamserviceaccount \
    --name aws-node \
    --namespace kube-system \
    --cluster {{cluster-name}} \
    --role-name AmazonEKSVPCCNIRole \
    --attach-policy-arn arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy \
    --override-existing-serviceaccounts \
    --approve
```

**Note**: This command is applicable for clusters using the `IPv4` address family and takes the `AmazonEKS_CNI_Policy` AWS managed policy

If your cluster uses the `IPv6` address family, a custom IAM policy must be created and attached:

1. Save the following content as `vpc-cni-ipv6-policy.json`.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:AssignIpv6Addresses",
                "ec2:DescribeInstances",
                "ec2:DescribeTags",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeInstanceTypes"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags"
            ],
            "Resource": [
                "arn:aws:ec2:*:*:network-interface/*"
            ]
        }
    ]
}
```

2. Create the policy using AWS CLI:

```sh
aws iam create-policy \
    --policy-name AmazonEKS_CNI_IPv6_Policy \
    --policy-document file://vpc-cni-ipv6-policy.json
```

Then, attach it to a new IAM role via `eksctl`, replacing the policy ARN accordingly.

### Re-deploy the Amazon VPC CNI Plugin

The annotation is not applied to Pods that are currently running without the annotation.

To apply the new IAM role, delete and re-create the existing `aws-node` pods:

```sh
kubectl delete Pods -n kube-system -l k8s-app=aws-node
```

Verify that the pods restart successfully:

```sh
kubectl get pods -n kube-system -l k8s-app=aws-node
```

Confirm that the environment variables `AWS_WEB_IDENTITY_TOKEN_FILE` and `AWS_ROLE_ARN` are set in the new pods. Replace `{{cpjw7}}` with the name of one of your Pods returned in the output of the previous step:

```sh
kubectl describe pod -n kube-system aws-node-{{cpjw7}} | grep 'AWS_ROLE_ARN:\|AWS_WEB_IDENTITY_TOKEN_FILE:'
```

### Detach the CNI Policy from the Node IAM Role

Once the IRSA setup is complete and validated, detach the `AmazonEKS_CNI_Policy` from the node IAM role:

```sh
aws iam detach-role-policy \
    --role-name {{eks-node-role}} \
    --policy-arn arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy
```
