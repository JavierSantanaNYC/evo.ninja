return __wrap_subinvoke(
      "plugin/child_process",
      "runCommand",
      {command: `Get-WinEvent -LogName ${logName} -FilterXPath "${filterXPath}"` }
    ).value;