FROM python:3.13-slim AS dependencies

WORKDIR /app

COPY pyproject.toml uv.lock ./

RUN pip install uv && \
    uv pip install --system --no-cache -r pyproject.toml

FROM python:3.13-slim

RUN addgroup --gid 1001 python && adduser --uid 1001 --gid 1001 --disabled-password python

WORKDIR /app

COPY --from=dependencies /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=dependencies /usr/local/bin/uvicorn /usr/local/bin/uvicorn
COPY --chown=python:python . .

USER python

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
