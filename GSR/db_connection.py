import mysql.connector
import settings

mydb = mysql.connector.connect(
  host=settings.HOST,
  user=settings.USER,
  password=settings.PASS,
  database=settings.DB
)

def create_table():
    mycursor = mydb.cursor()
    mycursor.execute("""CREATE TABLE IF NOT EXISTS ascend (id INT AUTO_INCREMENT PRIMARY KEY,
                     app VARCHAR(50), platform VARCHAR(50), date DATE,
                     ad_cpm DOUBLE(16,4), install_rate DOUBLE(16, 4),
                     ad_revenue DOUBLE(16,2), spent DOUBLE(16,4),  fill_rate DOUBLE(16,4),
                     unfilled_impressions DOUBLE(16,4), impressions DOUBLE(16,4), clicks DOUBLE(16,4),
                     measurable_impressions DOUBLE(16,4), viewable_impressions DOUBLE(16,4), page_views DOUBLE(16,4))
                    """)
create_table()
