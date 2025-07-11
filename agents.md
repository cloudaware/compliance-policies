---
unlisted: true
---
# Introduction for AI Agents

This directory is a git repository for Cloudaware Compliance Engine and other Cloudaware-related tools and data.

First, you need to read the documentation available in `@guides` folder.

You can execute relevant to the user's commands from `repo-manager` CLI.

It is also very likely that the environment will have installed and configured `gcloud` command. You can use it to execute BigQuery queries and other commands.

## .gitignore

You can and *should* search in files that are mentioned in `.gitignore`.

## Reading files

A lot of files in this repository contain more than 2000 lines, meaning `ReadFile` tool will not return the complete file, and therefore you'll not be able to find correct information.
If you encounter truncated data from the `ReadFile` tool, use `offset` option and load the rest of the file before proceeding further.

## Markdown style

This repository uses `markdownlint` for controlling styling of Markdown documents, when you create or update such documents, make sure you adhere to the style, all rules are enforced, except those which are mentioned in the configuration of `markdownlint` is located in `.vscode/settings.json` file under `markdownlint.config` key.

## Working with data in Cloudaware

If user input implies getting data from Cloudaware the best way of doing the following:

1. Find the object user wants to access
2. Compose a base SOQL query.
3. Convert SOQL query into BigQuery query using `repo-manager`
4. Modify BigQuery query to retrieve the data user wants
5. Execute the final query by running proper `gcloud` commands

### Finding an object in CMDB

1. Objects in Cloudaware usually named very similarly to their source data, including the name of the cloud, service, etc.
2. Look into file `types/types.json`, it contains lists of all available objects in Cloudaware and search for all possible object names there
   If this file is not found you can use `repo-manager types import -p REFERENCED` to re-import type references, and then look into this file again, but *only if there is no such file at all*
3. You can examine the repository to find the proper object
4. If you're not *absolutely* sure that the object you selected matches the user's request, let this know to the user and do not proceed further.

### Composing a base SOQL query

There are some limitations that you need to consider when creating base SOQL query:

1. Limitations of the SOQL language itself. Not everything is possible in SOQL, it's better to create a basic SOQL query that references all the types/tables and fields and then implement the more complicated logic by modifying the BigQuery query.
2. Limitations of SOQL converter:
   1. You *cannot use functions* in select statements, like `COUNT()`, etc.
   2. You *cannot use aggregation* in SOQL queries, for example `GROUP BY`

To create a base query, you need to:

1. Determine a proper object type you need to query (see above)
2. Now you can examine the type descriptor in the repo and find the fields for your query, along with their type and description
   - If you cannot find type descriptor for a type, you can use `repo-manager types import -t {yourTypeApiName}` to get the descriptor
   - If you're not *absolutely* sure that the field you selected matches the user's request, let this know to the user and do not proceed further.
3. You can use Lookup and Master-Detail fields for your queries, use proper Salesforce SOQL syntax when constructing the query.

### Converting SOQL to BigQuery

1. Create a directory with a short and precise name in `export` directory.
2. Write your query as file into that directory, as `base-query.soql`, for example `export/instance-count/base-query.soql`
3. Use `repo-manager soql convert --input-file=export/instance-count/base-query.soql --output-file=export/instance-count/converted-query.bqsql` for conversion.
4. Now you can re-evaluate the original user request against the converted query. If `converted-query.bqsql` does what customer requested you can execute it right away. If you need to make modification to the `converted-query.bqsql`, create a new file, called `final-query.bqslq` store the modified query there and execute it, instead of `converted-query.bqsql`

### Executing query

Call proper `glcoud` or `bq` command yourself to execute the final query, user's environment should have it properly configured, instead of providing query as a parameter, provide it as a file, for example `export/instance-count/final-query.bqsql`.
Redirect the output into the file called `result` in the same directory. Use proper extension for the data type you requested
