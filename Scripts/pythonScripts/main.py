# import sys
# import json

# output = {
#         "result": "hello World",
#     }

# sys.stdout.write(json.dumps(output))
# sys.stdout.flush()




import pandas as pd
import numpy as np
from gensim.models import Word2Vec
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import sys
import json

# Load the dataset
def load_data(file_path):
    df = pd.read_csv(file_path)
    df.columns = df.columns.str.strip()  # Remove any trailing spaces in column names
    df.fillna("", inplace=True)  # Fill missing values in text columns
    return df

# Custom transformer for Word2Vec embedding
class Word2VecTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, vector_size=100, window=5, min_count=1, workers=4):
        self.vector_size = vector_size
        self.window = window
        self.min_count = min_count
        self.workers = workers
        self.model = None

    def fit(self, X, y=None):
        tokenized_sentences = X.apply(lambda text: text.split() if isinstance(text, str) else [])
        self.model = Word2Vec(tokenized_sentences.tolist(), vector_size=self.vector_size,
                              window=self.window, min_count=self.min_count, workers=self.workers)
        return self

    def transform(self, X):
        tokenized_sentences = X.apply(lambda text: text.split() if isinstance(text, str) else [])
        return np.array([
            np.mean([self.model.wv[word] for word in words if word in self.model.wv] or [np.zeros(self.vector_size)], axis=0)
            for words in tokenized_sentences
        ])

# Define columns to transform
def get_columns():
    categorical_cols = [
        "What is your gender?",
        "What was your course in UG?",
        "What is your UG specialization? Major Subject (Eg; Mathematics)",
        "Did you do any certification courses additionally?",
        "Are you working?"
    ]
    text_cols = [
        "What are your interests?",
        "What are your skills ? (Select multiple if necessary)"
    ]
    target_col = "Predicted Career"
    return categorical_cols, text_cols, target_col

# Build the transformation pipeline
def build_pipeline(categorical_cols, text_cols):
    preprocessor = ColumnTransformer(transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols),
        ("text_interests", Word2VecTransformer(), text_cols[0]),
        ("text_skills", Word2VecTransformer(), text_cols[1])
    ])
    return Pipeline(steps=[("preprocessor", preprocessor)])

# Train a model
def train_model(file_path):
    df = load_data(file_path)
    categorical_cols, text_cols, target_col = get_columns()
    
    if target_col not in df.columns:
        raise KeyError(f"The target column '{target_col}' is missing from the dataset!")
    
    pipeline = build_pipeline(categorical_cols, text_cols)
    X = df[categorical_cols + text_cols]
    y = df[target_col]  # Target is now an actual career name
    
    X_transformed = pipeline.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_transformed, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=150, random_state=40,n_jobs=-1)
    model.fit(X_train, y_train)
    
    return pipeline, model, categorical_cols, text_cols, df, target_col

# Predict function
def predict_career(pipeline, model, categorical_cols, text_cols, df, target_col, user_input):
    user_df = pd.DataFrame([user_input])
    transformed_input = pipeline.transform(user_df)
    prediction = model.predict(transformed_input)[0]


    # print(f"You would be a {prediction}")
    return f"You would be a {prediction}"

# Example usage
if __name__ == "__main__":
    input_file = r"C:\Users\hazra\OneDrive\Desktop\execute4.0\execute\Scripts\pythonScripts\career_recommender_fixed.csv"  # Change this to your actual file path
    pipeline, model, categorical_cols, text_cols, df, target_col = train_model(input_file)
    
    input_list = ["What is your gender?", "What was your course in UG?", "What is your UG specialization? Major Subject (Eg; Mathematics)", "Did you do any certification courses additionally?", "Are you working?", "What are your interests?","What are your skills ? (Select multiple if necessary)"]

    data = sys.argv 

    user_input = {}
    

    for qs, i in zip(input_list, range(1, len(data))):
        val = data[i]
        user_input[qs] = val.title()
    
    

    output = {
        "result": predict_career(pipeline, model, categorical_cols, text_cols, df, target_col, user_input),
        "mydata":user_input
    }

    sys.stdout.write(json.dumps(output))
    sys.stdout.flush()






