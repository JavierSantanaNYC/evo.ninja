return __wrap_subinvoke(
    "plugin/child_process",
    "runCommand",
    {command: `ipconfig /all` }
  ).value;