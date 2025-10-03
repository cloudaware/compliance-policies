# Remediation

## Configure Lifecycle Policy

Create and apply a lifecycle policy to your Amazon ECR repository. A lifecycle policy contains one or more rules that define the cleanup actions for the images in your repository.

### **From AWS CLI**

1. Create a JSON file named `{{lifecycle-policy}}.json` with the rules for your policy. For example:

    ```json
    {
        "rules": [
            {
                "rulePriority": 1,
                "description": "Expire images older than 14 days",
                "selection": {
                    "tagStatus": "untagged",
                    "countType": "sinceImagePushed",
                    "countUnit": "days",
                    "countNumber": 14
                },
                "action": {
                    "type": "expire"
                }
            }
        ]
    }
    ```

2. Apply the lifecycle policy to your repository:

    ```bash
    aws ecr put-lifecycle-policy \
        --repository-name {{repository-name}} \
        --lifecycle-policy-text file://{{lifecycle-policy}}.json
    ```
