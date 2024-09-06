# Remediation

F

## From Console

1. Sign in to the AWS Management Console and navigate to EC2 dashboard at <https://console.aws.amazon.com/ec2/>.
2. In the left navigation panel, choose `Instances`.
3. Select the EC2 instance you want to modify.
4. Click `Actions`.
5. Click `Security`.
6. Click `Modify IAM role`.
7. Click `Create new IAM role` if a new IAM role is required.
8. Select the IAM role you want to attach to your instance in the `IAM role` dropdown.
9. Click `Update IAM role`.
10. Repeat steps 3 to 9 for each EC2 instance in your AWS account that requires an IAM role to be attached.

## From Command Line

1. Run the `describe-instances` command to list all EC2 instance IDs, available in the selected AWS region:

```sh
aws ec2 describe-instances --region <region-name> --query 'Reservations[*].Instances[*].InstanceId'
```

2. Run the `associate-iam-instance-profile` command to attach an instance profile (which is attached to an IAM role) to the EC2 instance:

```sh
aws ec2 associate-iam-instance-profile --region <region-name> --instance-id <Instance-ID> --iam-instance-profile Name="Instance-Profile-Name"
```

3. Run the `describe-instances` command again for the recently modified EC2 instance. The command output should return the instance profile ARN and ID:

```sh
aws ec2 describe-instances --region <region-name> --instance-id <Instance-ID> --query 'Reservations[*].Instances[*].IamInstanceProfile'
```

4. Repeat steps 1 to 3 for each EC2 instance in your AWS account that requires an IAM role to be attached.
