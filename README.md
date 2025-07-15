# apQuiz App

A full-stack quiz application using Flask (Python), MySQL, and a modern HTML/CSS/JS frontend.

## Features

- Excel upload and question ingestion
- User authentication (registration/login with bcrypt)
- Quiz flow with timer and navigation
- Submission and result storage
- Responsive, modern UI

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd ap
```

### 2. Set up Python environment

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Set up MySQL

- Create a database (e.g., `apquiz_db`).
- Run the SQL in `schema.sql` to create tables.
- Update database credentials in `apquiz_app/config.py`.

### 4. Run the app

```
python apquiz_app/app.py
```

### 5. Access the app

Open your browser at http://localhost:5000

## Excel Template

See `excel_template.xlsx` for the required format.

---

**Note:** For production, configure environment variables and use a production-ready WSGI server.
