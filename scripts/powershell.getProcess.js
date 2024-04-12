return __wrap_subinvoke(
    "plugin/child_process",
    "runCommand",
    {command: `Get-Process | Sort-Object ${sortMetric} -Descending | Select-Object -First 20` }
  ).value;