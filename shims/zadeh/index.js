// Pure-JS replacement for zadeh's native fuzzy filter. zadeh is abandoned and
// has no darwin-arm64 prebuild, so requiring it crashes Pulsar on Apple Silicon.
// atom-languageclient only uses `new ObjectArrayFilterer(list, key).filter(query)`.

// Subsequence match; score favours early, contiguous and word-start hits.
function score(candidate, query) {
	const lc = candidate.toLowerCase();
	const lq = query.toLowerCase();

	let points = 0;
	let index = -1;

	for (let i = 0; i < lq.length; i++) {
		const next = lc.indexOf(lq[i], index + 1);
		if (next === -1) return 0;

		if (next === index + 1) points += 8;
		if (candidate[next] === query[i]) points += 2;
		if (next === 0 || /[^a-zA-Z0-9]/.test(candidate[next - 1])) points += 4;

		points += 1;
		index = next;
	}

	// shorter candidates win ties
	return points + 10 / (10 + candidate.length);
}

class ObjectArrayFilterer {
	constructor(candidates, key) {
		this.setCandidates(candidates, key);
	}

	setCandidates(candidates, key = this.key) {
		this.candidates = candidates;
		this.key = key;
	}

	filter(query, { maxResults } = {}) {
		if (!query) {
			return maxResults ? this.candidates.slice(0, maxResults) : this.candidates;
		}

		const scored = [];

		for (const candidate of this.candidates) {
			const points = score(String(candidate[this.key] ?? ''), query);
			if (points > 0) scored.push({ candidate, points });
		}

		scored.sort((a, b) => b.points - a.points);

		const results = scored.map(({ candidate }) => candidate);

		return maxResults ? results.slice(0, maxResults) : results;
	}
}

class StringArrayFilterer extends ObjectArrayFilterer {
	constructor(candidates = []) {
		super(
			candidates.map((value) => ({ value })),
			'value',
		);
	}

	setCandidates(candidates, key) {
		super.setCandidates(
			key ? candidates : candidates.map((value) => (typeof value === 'string' ? { value } : value)),
			key ?? 'value',
		);
	}

	filter(query, options) {
		return super.filter(query, options).map(({ value }) => value);
	}
}

// The native `TreeFilterer` segfaults on arm64 (see `atom-ide-outline`), so the
// tree is flattened and each match returned as a leaf, without its children.
class TreeFilterer {
	constructor(candidates = [], dataKey = 'data', childrenKey = 'children') {
		this.setCandidates(candidates, dataKey, childrenKey);
	}

	setCandidates(candidates, dataKey = 'data', childrenKey = 'children') {
		this.candidates = candidates;
		this.dataKey = dataKey;
		this.childrenKey = childrenKey;

		const flattened = [];
		const walk = (nodes) => {
			for (const node of nodes) {
				flattened.push(node);
				const children = node?.[childrenKey];
				if (Array.isArray(children)) walk(children);
			}
		};

		walk(candidates);
		this.flattened = flattened;

		return true;
	}

	filter(query, options) {
		return new ObjectArrayFilterer(this.flattened, this.dataKey)
			.filter(query, options)
			.map((node) => ({ ...node, [this.childrenKey]: [] }));
	}
}

function filter(candidates, query, { key, maxResults } = {}) {
	return key
		? new ObjectArrayFilterer(candidates, key).filter(query, { maxResults })
		: new StringArrayFilterer(candidates).filter(query, { maxResults });
}

module.exports = { ObjectArrayFilterer, StringArrayFilterer, TreeFilterer, filter, score };
