# Remediation

Perform the following to enable global (Multi-region) CloudTrail logging:

## From Console

1. Sign in to the AWS Management Console and open the IAM console at <https://console.aws.amazon.com/cloudtrail>.
2. Click on `Trails` on the left navigation pane.
3. Click `Get Started Now`, if presented.

- Click `Add new trail`.
- Enter a trail name in the `Trail name` box.
- A trail created in the console is a multi-region trail by default.
- Specify an S3 bucket name in the `S3 bucket` box.
- Specify the AWS KMS alias under the `Log file SSE-KMS encryption` section or create a new key.
- Click `Next`.

4. Ensure `Management events` check box is selected.
5. Ensure both `Read` and `Write` are check under API activity.
6. Click `Next`.
7. Review your trail settings and click `Create trail`.

## From Command Line

Create a multi-region trail:

```sh
aws cloudtrail create-trail --name <trail_name> --bucket-name <s3_bucket_for_cloudtrail> --is-multi-region-trail aws cloudtrail update-trail --name <trail_name> --is-multi-region-trail
```

Enable multi-region on an existing trail:

```sh
aws cloudtrail update-trail --name <trail-name> --is-multi-region-trail
```

**Note**: Creating a CloudTrail trail via the CLI without providing any overriding options
configures all `read` and `write` `Management Events` to be logged by default.
