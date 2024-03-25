return __wrap_subinvoke(
      "plugin/child_process",
      "runCommand",
      {command: `Get-EventLog -LogName ${path} -Newest 10` }
    ).value;