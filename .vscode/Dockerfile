# ---- Base image ----
FROM python:3.11-slim

# ---- working dir ----
WORKDIR /app

# ---- copy backend source code ----
COPY ./backend /app/backend

# ---- install depencencies ----
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r /app/backend/requirements.txt

# ---- rum command when container boots ----
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
