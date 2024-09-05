# Remediation

## From Command Line

To set an S3 Lifecycle configuration on a bucket using the AWS CLI, follow these steps:

- Save a JSON Lifecycle configuration in a file `lifecycle.json`. Although the Amazon S3 Lifecycle configuration is an XML file, the AWS CLI requires the configuration to be specified in JSON format.

  Here's an example of an S3 Lifecycle Configuration in JSON format:

```json
{
  "Rules": [
    {
      "ID": "ExampleRule1",
      "Filter": {
        "Prefix": "documents/"
      },
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 60,
          "StorageClass": "INTELLIGENT_TIERING"
        },
        {
          "Days": 120,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 730
      }
    }
  ]
}

```

  In this example objects with the prefix `documents/` will transition to the Intelligent-Tiering storage class after 60 days, then to the Glacier storage class after 120 days. Finally, the objects will be automatically deleted after 730 days.

- Execute the following AWS CLI command to set the Lifecycle configuration on your S3 bucket. Replace `{{your--bucket-name}}` with the actual name of your S3 bucket:

```sh
aws s3api put-bucket-lifecycle-configuration --bucket {{your-bucket-name}} --lifecycle-configuration file://lifecycle.json
```

This command uploads the Lifecycle configuration from the `lifecycle.json` file to the specified S3 bucket.
