Use this query to generate list of objects with their API names and `Breeze: Last Update` field names:

```sql
SELECT type.label, type.apiName, domain.breeze.lastUpdateField FROM `${project}.${sobjectsExportDateset}.Metadata` WHERE domain.breeze IS NOT NULL ORDER BY type.label
```