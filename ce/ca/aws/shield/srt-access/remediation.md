# Remediation

## Configure SRT Access for AWS Shield Advanced

To allow the **AWS Shield Response Team (SRT)** to assist in mitigating DDoS events, you must create or configure an IAM role that grants the necessary permissions using the managed policy **`AWSShieldDRTAccessPolicy`**.

### **From Command Line**

1. **Create the IAM Role for the SRT**

    Create a trust policy document named `trust-policy.json` with the following content:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
            "Service": "drt.shield.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
        ]
    }
    ```

    Then create the IAM role using the trust policy:

    ```sh
    aws iam create-role \
        --role-name AWSShieldDRTRole \
        --assume-role-policy-document file://trust-policy.json \
        --description "Role granting AWS Shield Response Team (SRT) access to assist with DDoS mitigation"
    ```

2. **Attach the Managed Policy**

    Attach the AWS-managed policy **`AWSShieldDRTAccessPolicy`** to the role:

    ```sh
    aws iam attach-role-policy \
        --role-name AWSShieldDRTRole \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSShieldDRTAccessPolicy
    ```

3. **Associate the Role with Shield Advanced**

    Link the newly created role with Shield Advanced to grant SRT access:

    ```sh
    aws shield associate-drt-role \
        --role-arn arn:aws:iam::{{account-id}}:role/AWSShieldDRTRole
    ```
