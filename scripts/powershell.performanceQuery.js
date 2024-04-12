return __wrap_subinvoke(
    "plugin/child_process",
    "runCommand",
    {command: `typeperf.exe "${counterName}" -sc 30` }
  ).value;