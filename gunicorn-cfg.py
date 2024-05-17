# gunicorn-cfg.py

import multiprocessing
import os

# Get the port from the environment variable PORT (set by Render)
port = os.getenv('PORT', '8000')

# Basic settings
bind = f"0.0.0.0:{port}"
workers = multiprocessing.cpu_count() * 2 + 1
threads = 2  # Number of threads per worker
timeout = 120  # Time in seconds before a worker is killed and restarted

# Logging
accesslog = '-'  # Log access to stdout
errorlog = '-'  # Log errors to stdout
loglevel = 'info'  # Set the log level to info

# Graceful timeout
graceful_timeout = 120

# Keep-alive settings
keepalive = 5
