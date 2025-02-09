import json

with open('dataset1.JSON', 'r',encoding='utf-8') as json_file:
    data = json.load(json_file)

tags = [intent['tag'] for intent in data['intents']]
count = 0
print("Tags present in the dataset:")
for tag in tags:
    print(tag)
    count = count +1 

print(count)

