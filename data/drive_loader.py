import pandas as pd

def load_drive_csv(file_id):
    url = f"https://drive.google.com/uc?id={file_id}"
    return pd.read_csv(url)

# Example usage
df = load_drive_csv("YOUR_FILE_ID")
print(df.head())
