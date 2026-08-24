import json

with open('evals/evals.json', encoding='utf-8') as f:
    data = json.load(f)

print('Skill name:', data.get('skill_name'))
print('Number of evals:', len(data['evals']))
for i, eval_item in enumerate(data['evals']):
    print(f"\nEval {i}:")
    print(f"  ID: {eval_item['id']}")
    print(f"  Prompt: {eval_item['prompt'][:60]}...")
    print(f"  Expected: {eval_item['expected_output']}")