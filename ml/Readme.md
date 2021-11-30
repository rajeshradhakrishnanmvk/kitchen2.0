## PreRequisites 

install python

python -m venv kitchen

pip install sklearn torch datasets transformers[torch]

python -c "from datasets import load_dataset; print(load_dataset('squad', split='train')[0])"

python -c "from transformers import pipeline; print(pipeline('sentiment-analysis')('we love you'))"

transformers-cli login

git lfs install

## Datasets


[rajeshradhakrishnan/malayalam_wiki](https://huggingface.co/datasets/rajeshradhakrishnan/malayalam_wiki)

[rajeshradhakrishnan/malayalam_news](https://huggingface.co/datasets/rajeshradhakrishnan/malayalam_news)

[rajeshradhakrishnan/malayalam_2020_wiki](https://huggingface.co/datasets/rajeshradhakrishnan/malayalam_2020_wiki)

## Models

[rajeshradhakrishnan/malayalam-wiki2021-BERTo](https://huggingface.co/rajeshradhakrishnan/malayalam-wiki2021-BERTo)