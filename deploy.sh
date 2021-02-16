#!/bin/bash

if [ -d ".venv" ]
then
    . .venv/bin/activate
    pip install -r requirements.txt
    python wsgi.py
else
    python3 -m venv .venv
    . .venv/bin/activate
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    python wsgi.py
fi