# Prompts

This directory contains pre-defined prompts that provide comprehensive instructions for LLMs working with the Cloudaware Compliance Engine v2 policy repository.

## Available Prompts

### [Working With Policies](policies-repo-only.md)

**Use this when:** Working without MCP (Model Context Protocol) tools.

This prompt provides complete instructions for:
- Creating and testing compliance policies
- Using the `repo-manager` CLI tool
- Working with the repository structure and conventions
- Manually discovering types and fields using local files
- Converting SOQL to BigQuery and executing queries

**Best for:** Environments where MCP tools are not available or when working with standard LLM interfaces.

### [Working With Policies (cloudaware-mcp)](policies-with-mcp.md)

**Use this when:** The `cloudaware-mcp` MCP server is available.

This enhanced prompt includes all capabilities from the basic version, plus:
- Schema discovery using MCP tools (`search_types`, `search_fields`)
- Field value analysis with `analyze_field` to understand actual data
- Relationship mapping with `get_relationship_graph`
- Direct BigQuery execution with `execute_query`
- Faster, more efficient type and field discovery

**Best for:** Claude Code, Claude Desktop, or other MCP-enabled environments with the CloudAware MCP server configured.

## How to Use

Attach the appropriate prompt to your LLM request using the `@` sign:

```
@prompts/policies-repo-only.md
```

or

```
@prompts/policies-with-mcp.md
```

The LLM will then follow the comprehensive guidelines in the prompt to help you create policies, debug logic, query data, and manage the repository.
