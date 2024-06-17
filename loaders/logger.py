from typing import Literal
from rich.console import Console

# Initialize the Console object
console = Console()
# Define the type for log_type
LogType = Literal['info', 'warning', 'error', 'success']

def c_log(log_type: LogType, data: str):
    if log_type == 'info':
        console.print(f"[bold cyan]INFO: {data} [/bold cyan]")
    elif log_type == 'warning':
        console.print(f"[bold yellow]WARNING: {data} [/bold yellow]")
    elif log_type == 'error':
        console.print(f"[bold red]ERROR: {data} [/bold red]")
    elif log_type == 'success':
        console.print(f"[bold green]SUCCESS: {data} [/bold green]")
