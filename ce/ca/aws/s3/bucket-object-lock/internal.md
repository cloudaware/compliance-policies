# Internal notes

This is a best practice since there are cases when object lock shouldn't be enabled.

## When Not to Use S3 Object Lock

- Dynamic Data: When your data requires frequent updates, modifications, or deletions, implementing S3 Object Lock may hinder operational agility and flexibility.
- Temporary Data: When dealing with transient or temporary data that doesn't require long-term retention or immutability, using S3 Object Lock may add unnecessary complexity and overhead.
- High Frequency Write Workloads: When your application necessitates high throughput or frequent write operations to S3 objects, S3 Object Lock may introduce performance limitations due to its immutable nature.
- Cost Considerations: When evaluating the cost implications, as enabling S3 Object Lock may incur additional charges for compliance features that might not be necessary for all types of data.

In summary, S3 Object Lock is best suited for scenarios where data integrity, immutability, and compliance are important. However, for dynamic or temporary data that requires frequent updates or doesn't have strict retention requirements, implementing S3 Object Lock may not be necessary and could potentially introduce operational complexities and additional costs.
