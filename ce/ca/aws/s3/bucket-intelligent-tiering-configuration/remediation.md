# Remediation

## From Command Line

This ensures that objects can automatically transition to Archive Access after 90 days or Deep Archive Access after 180 days:

```sh
aws s3api put-bucket-intelligent-tiering-configuration \
    --bucket {{bucket-name}} \
    --id {{config-id}} \
    --intelligent-tiering-configuration '{
        "Id": "{{config-id}}",
        "Status": "Enabled",
        "Filter": {},
        "Tierings": [
            {
                "Days": 90,
                "AccessTier": "ARCHIVE_ACCESS"
            },
            {
                "Days": 180,
                "AccessTier": "DEEP_ARCHIVE_ACCESS"
            }
        ]
    }'
```

This command enables both *Archive Access* and *Deep Archive Access* tiers. You may enable only one of them by omitting the undesired block from the `Tierings` array.
