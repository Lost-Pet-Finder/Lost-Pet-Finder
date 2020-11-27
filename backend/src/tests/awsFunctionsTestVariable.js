const getAWStagsConst = [
	{
		Confidence: 97.96702575683594,
		Instances: [],
		Name: 'Canine',
		Parents: [{ Name: 'Mammal' }, { Name: 'Animal' }],
	},
	{
		Confidence: 97.96702575683594,
		Instances: [
			{
				BoundingBox: {
					Height: 0.862496554851532,
					Left: 0.3017416000366211,
					Top: 0.1239473968744278,
					Width: 0.3514426648616791,
				},
				Confidence: 97.96702575683594,
			},
		],
		Name: 'Dog',
		Parents: [
			{ Name: 'Pet' },
			{ Name: 'Canine' },
			{ Name: 'Animal' },
			{ Name: 'Mammal' },
		],
	},
	{
		Confidence: 97.96702575683594,
		Instances: [],
		Name: 'Mammal',
		Parents: [{ Name: 'Animal' }],
	},
	{
		Confidence: 97.96702575683594,
		Instances: [],
		Name: 'Pet',
		Parents: [{ Name: 'Animal' }],
	},
	{ Confidence: 97.96702575683594, Instances: [], Name: 'Animal', Parents: [] },
	{
		Confidence: 84.23500061035156,
		Instances: [],
		Name: 'Puppy',
		Parents: [
			{ Name: 'Dog' },
			{ Name: 'Pet' },
			{ Name: 'Canine' },
			{ Name: 'Animal' },
			{ Name: 'Mammal' },
		],
	},
	{
		Confidence: 73.71802520751953,
		Instances: [],
		Name: 'Golden Retriever',
		Parents: [
			{ Name: 'Dog' },
			{ Name: 'Pet' },
			{ Name: 'Canine' },
			{ Name: 'Animal' },
			{ Name: 'Mammal' },
		],
	},
	{
		Confidence: 73.6204833984375,
		Instances: [],
		Name: 'Labrador Retriever',
		Parents: [
			{ Name: 'Dog' },
			{ Name: 'Pet' },
			{ Name: 'Canine' },
			{ Name: 'Animal' },
			{ Name: 'Mammal' },
		],
	},
];

exports.getAWStagsConst = getAWStagsConst;
