# Description

Ensure that your Amazon RDS database instances are not using their default endpoint ports (e.g., MySQL/Aurora port 3306, SQL Server port 1433, PostgreSQL port 5432) to enhance security through port obfuscation. Changing the default endpoint ports can add an extra layer of defense against non-targeted attacks.

## Rationale

Using default endpoint ports for Amazon RDS database instances can make them more susceptible to automated attacks and scans that target common database ports.

Port obfuscation adds an extra layer of security by making it more difficult for attackers to identify and target your database instances. Non-standard ports are less likely to be targeted by generic scanning and exploitation tools, reducing the overall attack surface of your database environment.

## Audit

This policy evaluates the following endpoint port configurations of Amazon RDS database instances:

|Database Engine|Default Port|
|---|---|
|MySQL/Aurora/MariaDB|3306|
|PostgreSQL/Aurora|5432|
|Oracle|1521|
|Microsoft SQL Server|1433|
|DocumentDB|27017|

An AWS RDS instance is marked as `INCOMPLIANT` if it is using a default endpoint port specified in the table above.

An AWS RDS instance is marked as `COMPLIANT` if it is using a non-default endpoint port.
