
# Report


# Requirements

    python = 3.x.x
    create .env file in root folder add following env variable:
    TOKEN="token"
    URI="url"
    HOST = "db_host"
    USER = "db_user"
    PASS = "db_password"
    DB = "db_name"


# Run Program

    install all depependencies:
    pip install -r requirements.txt

    run main script:
    python main.py start_date end_date dimensions
    ex. python main.py 2023-01-01 2023-01-02 app,platform,country
