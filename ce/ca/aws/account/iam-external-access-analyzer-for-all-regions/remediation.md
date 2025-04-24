# Remediation

## From Console

Perform the following to enable IAM Access analyzer for IAM policies:

1. Open the IAM console at <https://console.aws.amazon.com/iam/>.
2. Choose `Access analyzer`.
3. Choose `Create analyzer`.
4. On the `Create analyzer` page, confirm that the `Region` displayed is the Region where you want to enable Access Analyzer.
5. Enter a name for the analyzer. (Optional as it will generate a name for you automatically).
6. Add any tags that you want to apply to the analyzer. (Optional).
7. Choose `Create Analyzer`.
8. Repeat these step for each active region.

## From Command Line

Run the following command:

```sh
aws accessanalyzer create-analyzer --analyzer-name <NAME> --type <ACCOUNT|ORGANIZATION>
```

Repeat this command above for each active region.

**Note**: The IAM Access Analyzer is successfully configured only when the account you use has the necessary permissions.
