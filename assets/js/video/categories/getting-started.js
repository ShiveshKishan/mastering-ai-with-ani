(function (window) {
    const gettingStarted = {
        id: 'gettingStarted',
        title: 'Getting Started',
        description: 'Practice watching and remembering details.',
        thumbnail: '../assets/img/domestic-animals/cat.jpg',
        items: [
            {

                id: 'elephant-drinking-water-001',
                title: 'Elephant Drinking Water',
                videoId: '22MpnyB4MNU',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Elephant', 'Hippo', 'Lion', 'Zebra'],
                        answer: 'Elephant'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the elephant?',
                        options: ['Pond', 'Desert', 'Mountain', 'River'],
                        answer: 'Pond'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What was the elephant doing?',
                        options: ['Drinking', 'Running', 'Sleeping', 'Jumping'],
                        answer: 'Drinking'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What was the elephant drinking?',
                        options: ['Water', 'Milk', 'Juice', 'Tea'],
                        answer: 'Water'
                    },
                    {
                        id: 'q5',
                        enabled: true,
                        question: 'What did you see near the elephant?',
                        options: ['Bird', 'Deer', 'Tiger', 'Crocodile'],
                        answer: 'Bird'
                    }
                ]
            },
            {
                id: 'hippo-bathing-001',
                title: 'Hippo Bathing in Water',
                videoId: '41eAr1znZSU',
                // Hippo in the Pond
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Hippo', 'Elephant', 'Lion', 'Rhino'],
                        answer: 'Hippo'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the hippo?',
                        options: ['Pond', 'Desert', 'Mountain', 'River'],
                        answer: 'Pond'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What was floating on the water?',
                        options: ['Lilies', 'Rocks', 'Branches', 'Fish'],
                        answer: 'Lilies'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What was the hippo doing?',
                        options: ['Bathing', 'Sleeping', 'Eating', 'Running'],
                        answer: 'Bathing'
                    }
                ]
            }
        ]
    };

    window.MAVideoContent = window.MAVideoContent || { categories: {} };
    window.MAVideoContent.categories[gettingStarted.id] = gettingStarted;
})(window);
