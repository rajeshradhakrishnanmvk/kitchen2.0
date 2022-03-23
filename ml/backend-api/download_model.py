# Imports
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Specify model paths
hf_model_path = "rajeshradhakrishnan/malayalam_news_classifier"
local_model_path = "model/malayalam_news_classifier"

# Save the tokenizer and model locally
tokenizer = AutoTokenizer.from_pretrained(hf_model_path)
print("Tokenizer downloaded...")
tokenizer.save_pretrained(local_model_path)
print("Tokenizer saved locally...")
model = AutoModelForSequenceClassification.from_pretrained(hf_model_path)
print("Model downloaded...")
model.save_pretrained(local_model_path)
print("Model saved locally...")
