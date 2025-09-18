import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from supabase import create_client
import pandas as pd

# ---- Load from Supabase ----
url = "https://gqwravnbmbfhrsskljhn.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxd3Jhdm5ibWJmaHJzc2tsamhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzA5MjEzMiwiZXhwIjoyMDcyNjY4MTMyfQ.5Mk44RxdPSgoZ05oAt1KGKUPxJBK3X99Hsb7lsfY6S4"  # use service role for full access
supabase = create_client(url, key)

sensor_data = supabase.table("sensor_table").select("*").execute().data
df_supabase = pd.DataFrame(sensor_data)

# ---- Load from CSV ----
df_csv = pd.read_csv("data/training_data.csv")

# ---- Merge Datasets ----
df = pd.concat([df_supabase, df_csv], ignore_index=True)

# ---- Features ----
X = df[["temp", "hum", "soil"]]
y_water = df["water_needed"]
y_crop = df["crop"]

# ---- Train models ----
water_model = RandomForestRegressor()
water_model.fit(X, y_water)
joblib.dump(water_model, "backend/models/water_predictor.pkl")

crop_model = RandomForestClassifier()
crop_model.fit(X, y_crop)
joblib.dump(crop_model, "backend/models/crop_classifier.pkl")

print("✅ Models trained and saved to backend/models/")