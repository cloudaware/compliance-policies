# Description

This policy identifies AWS Kinesis Streams configured with a retention period of less than 168 hours (7 days).

## Rationale

By default, records in a Kinesis data stream are retained for only 24 hours. Extending the retention period to 7 days provides a meaningful reliability buffer. If a downstream consumer, such as an AWS Lambda function or an application running on Amazon EC2, fails or experiences processing delays, a longer retention window ensures that data remains available while the issue is investigated and resolved.

Additionally, during periods of increased data ingestion, consumers may fall behind. A 7-day retention period allows sufficient time to scale consumer capacity and reprocess data without permanent data loss.

Many organizations also require the ability to re-run analytics or perform audits on recent data. Short retention periods increase reliance on external backup mechanisms even for recent events, adding operational complexity.

## Impact

Increasing the retention period beyond the default 24 hours results in additional AWS costs, which are based on the volume of data retained and the configured retention duration.

## Audit

This policy flags an *AWS Kinesis Stream* as `INCOMPLIANT` if the `Retention Period Hours` value is less than **168**.
