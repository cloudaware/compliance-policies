# MCP Server

## Overview

The CloudAware MCP (Metadata and Query Proxy) Server provides a secure interface for discovering and querying metadata and data from your CloudAware datasets stored in Google BigQuery. 
It enables programmatic access to object types, fields, relationships, and direct SQL query execution, helping you explore and analyze your cloud infrastructure data efficiently. 
Note that the server is currently under active development, and its features, APIs, and behaviors may evolve significantly in future releases. 
For the latest updates, refer to the release notes or contact support.

## Tools Overview

The server exposes a set of tools via a JSON-RPC interface for metadata discovery and data querying. These tools are designed to be used in a step-by-step manner:

- **search_types**: Search for object types based on keywords to identify API names and table IDs.
- **search_fields**: Retrieve field metadata for a specific type, including labels, types, and descriptions.
- **get_relationship_graph**: Get a graph of relationships starting from a type to understand joins.
- **analyze_field**: Provides statistics about the values of a specific field of a specific type.
- **execute_query**: Run custom BigQuery SQL queries on your dataset.

AI agent should follow a discovery-first approach: start with type and field searches before querying data. Detailed tool descriptions, inputs, and outputs are available in the API reference (accessible via the server's endpoint).

## Configuration Parameters

The MPC server requires 2 parameters to be accessible to operate:

- `exportProject` - The GCP project where the data exported from CloudAware is located.
- `sObjectsDataset` - The dataset within the `exportProject` where all the tables are located.

Depending on the environment where the server is running, these parameters are retrieved differently:

- Locally run servers use `repo-manager` and `gcloud` commands to obtain the values
- Servers that run with OAuth and HTTP transport require these parameters to be provided explicitly via query parameter or HTTP header (see below)

You also have an ability to switch the `exportProject` and `sObjectsDataset` on the fly, by asking your agent explicitly:

> Use export project `my-export-project` and dataset `my-dataset`.
> How many EC2 Instances I have?

The agent should start using these new values for all subsequent requests to the MCP server.

## `stdio` Transport

The MCP Server supports local operation though `stdio` transport.

The server is run through the [`repo-manager`](../developer/repo-manager/index.md) tool.

This server uses:

- `repo-manager` authentication profile (see [`repo-manager auth`](../developer/repo-manager/cli.md#repo-manager-auth)) to automatically discover your [Export Project](../datasets/index.md) and [SObjects Dataset](../datasets/sobjects/index.md).
- `gcloud` authentication to access your Cloudaware CMDB data in Google BigQuery.

You have to set up both authentication profiles before using the server.

### Claude Code

Add Cloudaware MCP by running the following command:

```shell
claude mcp add --transport stdio cloudaware-mcp -- java -jar ~/.ca/repo-manager.jar mcp cloudaware
```

Assuming you have `repo-manager` installed in `~/.ca/repo-manager.jar`. If not, provide the path to your `repo-manager.jar` file.

After adding the MCP server, start Claude Code and use `/mcp` command to authenticate.

### Gemini CLI

Add following to your `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "cloudaware-mcp": {
      "command": "repo-manager",
      "args": ["mcp", "cloudaware"]
    }
  }
}
```

Or in case you haven't created alias for `repo-manager`:

```json
{
  "mcpServers": {
    "cloudaware-mcp": {
      "command": "java",
      "args": ["-jar", "path/to/your/repo-manager.jar", "mcp", "cloudaware"]
    }
  }
}
```

### Kilo Code

Configuration is the same as for the [Gemini CLI](#gemini-cli). The configuration file is usually located in `.kilocode/mcp.json` in your working directory.

### OpenCode

Add following to your `opencode.json`:

```json
{
  "mcp": {
    "cloudaware-mcp": {
      "type": "local",
      "command": ["repo-manager", "mcp", "cloudaware"],
      "enabled": true
    }
  }
}
```

Or in case you haven't created alias for `repo-manager`:

```json
{
  "mcp": {
    "cloudaware-mcp": {
      "type": "local",
      "command": ["-jar", "path/to/your/repo-manager.jar", "mcp", "cloudaware"],
      "enabled": true
    }
  }
}
```

## HTTP Transport Running Locally

Similarly to `stdio` transport, you can run the server locally with `repo-manager mcp cloudaware --port 8888`. This will start the server on port 8888.

### LM Studio

Edit `mcp.json` and add following:

```json
{
  "mcpServers": {
    "cloudaware-mcp": {
      "url": "http://localhost:8888/mcp"
    }
  }
}
```

## HTTP Transport With OAuth

For tools that support integration with HTTP transport and OAuth authentication, you can use the server's endpoint URL to make requests directly.

**Configuration Parameters**:

- Server URL: `https://inbound.prod.cloudaware.com/mcp`
- [Export Project](../datasets/index.md) ID: set via `X-CA-ExportProject` header
- [SObjects Dataset](../datasets/sobjects/index.md) Name: set via `X-CA-SObjectsDataset` header

Server uses Google OAuth 2.0 for authentication. You must have required permissions to access SObjects dataset in Export Project.

### Claude Code

Add Cloudaware MCP by running the following command:

```shell
claude mcp add --transport http cloudaware-mcp "https://inbound.prod.cloudaware.com/mcp?exportProject=your-export-project-id&sObjectsDataset=your-sobjects-dataset-name"
```

Replace `your-export-project-id` and `your-sobjects-dataset-name` with your actual values.

After adding the MCP server, start Claude Code and use `/mcp` command to authenticate.

### Claude.ai

Add Cloudaware MCP by going into `Settings` → `Connectors` → `Add custom connector` and adding a new server with the following parameters:

- Name: `cloudaware-mcp`
- URL: `https://inbound.prod.cloudaware.com/mcp?exportProject=your-export-project-id&sObjectsDataset=your-sobjects-dataset-name`
- Advanced Settings → OAuth Client ID: leave blank
- Advanced Settings → OAuth Client Secret: leave blank

Replace `your-export-project-id` and `your-sobjects-dataset-name` with your actual values.

### Gemini CLI

Add following to your `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "cloudaware-mcp": {
      "httpUrl": "https://inbound.prod.cloudaware.com/mcp",
      "headers": {
        "X-CA-ExportProject": "your-export-project-id",
        "X-CA-SObjectsDataset": "your-sobjects-dataset-name"
      }
    }
  }
}
```

Start Gemini CLI and run `/mcp auth cloudaware-mcp` to authenticate.

### LibreChat

Add the following to your [`librechat.yaml`](https://www.librechat.ai/docs/configuration/librechat_yaml):

```yaml
mcpServers:
  cloudaware-mcp:
    type: streamable-http
    url: https://inbound.prod.cloudaware.com/mcp?exportProject=your-export-project-id&sObjectsDataset=your-sobjects-dataset-name
    timeout: 30000
    serverInstructions: true
```

### n8n.cloud

You can connect to Cloudaware MCP Server using the MCP Client node directly, or via the Tools section of the AI Agent node.

To set up credentials, go to `Personal` → `Credentials` in your n8n dashboard. Click `Create Credentials` → `MCP Oauth2 API`.
Use the following parameters:
- Use dynamic client registration: leave turned on
- Server URL: `https://inbound.prod.cloudaware.com/mcp`

Use the following parameters in MCP Client node settings:
- Server Transport: `HTTP Streamable`
- MCP Endpoint URL: `https://inbound.prod.cloudaware.com/mcp?exportProject=your-export-project-id&sObjectsDataset=your-sobjects-dataset-name`
- Authentication: `MCP OAuth2`
- Credential for MCP OAuth2 API: credentials created in the previous step

Replace `your-export-project-id` and `your-sobjects-dataset-name` with your actual values.

### ChatGPT

You can create an app that uses Cloudaware MCP, available with a Plus subscription.
- Enable Developer Mode: Go to `Settings` → `Apps` → `Advanced Settings` → `Developer Mode`.
- Create an Application: Click `Create App` next to `Advanced Settings`.

Use the following settings:
- Name: `cloudaware-mcp`
- MCP Server URL: `https://inbound.prod.cloudaware.com/mcp?exportProject=your-export-project-id&sObjectsDataset=your-sobjects-dataset-name`
- Authentication: `OAuth`

Replace `your-export-project-id` and `your-sobjects-dataset-name` with your actual values.