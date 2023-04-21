---
layout: post
title: Map Datadog event attribute to status
date: 2023-04-21 16:45:36
excerpt: How to map Datadog event attribute to status using Log Status Remapper.
categories: datadog
---

If your [Datadog logs](https://app.datadoghq.com/logs) show the incorrect **Status**, then you should set up a [log status remapper](https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-status-remapper).

Go to [Logs](https://app.datadoghq.com/logs) > [Pipelines](https://app.datadoghq.com/logs/pipelines) > [Add a new pipeline](https://app.datadoghq.com/logs/pipelines/pipeline/add).

Set up an optional **Filter** for your service like:

```
service:api.example.com
```

If your Datadog log's **Event Attributes** looks like:

```json
{
  "log_level_name": "ERROR"
}
```

Then all you need to do is click **Add Processor**, select **Status Remapper**, and update **Set status attribute(s)** to:

```
log_level_name
```

If your Datadog log's **Event Attributes** looks like:

```json
{
  "log_level_value": 400
}
```

Then click **Add Processor**, select **Category Processor**, and update **Set target category attribute**:

```
log_level_mapping
```

Add the entries to map your category attributes:

| NAME    | MATCHING QUERY       |
| ------- | -------------------- |
| Error   | @log_level_value:400 |
| Warning | @log_level_value:300 |
| Info    | @log_level_value:200 |

Then click **Add Processor**, select **Status Remapper**, and update **Set status attribute(s)** to:

```
log_level_mapping
```

Now your Datadog log statuses should be mapped correctly!

For more information, see ["Remap Custom Severity Values to the Official Log Status"](https://docs.datadoghq.com/logs/guide/remap-custom-severity-to-official-log-status/).
