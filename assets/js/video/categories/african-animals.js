(function (window) {
    const africanAnimals = {
        id: 'africanAnimals',
        title: 'African Animals',
        description: 'Practice watching and remembering details.',
        thumbnail: '../assets/img/video-thumbnail/african_animals.png',
        items: [
            // 1. ELEPHANT
            {
                id: 'elephant-pond-001',
                title: 'Elephant at the Pond',
                videoId: 'ELEPHANT_VIDEO_ID',
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
                    },
                    {
                        id: 'q6',
                        enabled: true,
                        question: 'Was the elephant running to the pond?',
                        options: ['Yes', 'No'],
                        answer: 'No'
                    },
                    {
                        id: 'q7',
                        enabled: true,
                        question: 'Was the elephant walking to the pond?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 2. HIPPO
            {
                id: 'hippo-pond-001',
                title: 'Hippo in the Pond',
                videoId: 'HIPPO_VIDEO_ID',
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
                        options: ['Lilies', 'Rocks', 'Branches', 'Stones'],
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
            },


            // 3. LION
            {
                id: 'lion-tree-001',
                title: 'Lion Under the Tree',
                videoId: '4T0ArLfDCPw',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Lion', 'Tiger', 'Leopard', 'Zebra'],
                        answer: 'Lion'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the lion?',
                        options: ['Forest', 'Pond', 'Mountain', 'Beach'],
                        answer: 'Forest'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What was the lion doing first?',
                        options: ['Walking', 'Sleeping', 'Swimming', 'Eating'],
                        answer: 'Walking'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What did the lion find?',
                        options: ['Tree', 'Pond', 'Rock', 'Cave'],
                        answer: 'Tree'
                    },
                    {
                        id: 'q5',
                        enabled: true,
                        question: 'What did the lion do after walking?',
                        options: ['Sit', 'Run', 'Jump', 'Swim'],
                        answer: 'Sit'
                    },
                    {
                        id: 'q6',
                        enabled: false,
                        question: 'Where did the lion sit?',
                        options: ['Shade', 'Water', 'Road', 'Rock'],
                        answer: 'Shade'
                    },
                    {
                        id: 'q7',
                        enabled: true,
                        question: 'Did the lion sit under a tree?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 4. GIRAFFE
            {
                id: 'giraffe-tree-001',
                title: 'Giraffe and the Tree',
                videoId: 'C8q7Jo7oJkc',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Giraffe', 'Zebra', 'Elephant', 'Rhino'],
                        answer: 'Giraffe'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the giraffe?',
                        options: ['Forest', 'Pond', 'Desert', 'Mountain'],
                        answer: 'Forest'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What was the giraffe doing first?',
                        options: ['Walking', 'Sleeping', 'Running', 'Eating'],
                        answer: 'Walking'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What did the giraffe find?',
                        options: ['Tree', 'Pond', 'Rock', 'Cave'],
                        answer: 'Tree'
                    },
                    {
                        id: 'q5',
                        enabled: true,
                        question: 'What did the giraffe eat?',
                        options: ['Leaves', 'Grass', 'Fruit', 'Flowers'],
                        answer: 'Leaves'
                    },
                    {
                        id: 'q6',
                        enabled: true,
                        question: 'Did the giraffe eat leaves?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 5. ZEBRA
            {
                id: 'zebra-run-001',
                title: 'Zebra Running',
                videoId: 'n7KNeIeq6vQ',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Zebra', 'Horse', 'Giraffe', 'Lion'],
                        answer: 'Zebra'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the zebra?',
                        options: ['Forest', 'Pond', 'Mountain', 'Beach'],
                        answer: 'Forest'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What was the zebra doing first?',
                        options: ['Walking', 'Running', 'Sleeping', 'Eating'],
                        answer: 'Walking'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What did the zebra do next?',
                        options: ['Stop', 'Jump', 'Sleep', 'Swim'],
                        answer: 'Stop'
                    },
                    {
                        id: 'q5',
                        enabled: true,
                        question: 'What did the zebra do after stopping?',
                        options: ['Run', 'Sleep', 'Eat', 'Swim'],
                        answer: 'Run'
                    },
                    {
                        id: 'q6',
                        enabled: true,
                        question: 'Did the zebra run?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 6. RHINO
            {
                id: 'rhino-ground-001',
                title: 'Rhino in the Forest',
                videoId: 'LkvayOl5oUM',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Rhino', 'Hippo', 'Elephant', 'Buffalo'],
                        answer: 'Rhino'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the rhino?',
                        options: ['Forest', 'Pond', 'Desert', 'Mountain'],
                        answer: 'Forest'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What was the rhino doing first?',
                        options: ['Walking', 'Running', 'Sleeping', 'Eating'],
                        answer: 'Walking'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What did the rhino lower?',
                        options: ['Head', 'Tail', 'Leg', 'Ear'],
                        answer: 'Head'
                    },
                    {
                        id: 'q5',
                        enabled: false,
                        question: 'What did the rhino rub on the ground?',
                        options: ['Horn', 'Tail', 'Foot', 'Ear'],
                        answer: 'Horn'
                    },
                    {
                        id: 'q6',
                        enabled: true,
                        question: 'Did the rhino lower its head?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 7. GORILLA
            {
                id: 'gorilla-leaf-001',
                title: 'Gorilla and the Leaf',
                videoId: 'Tv0o4sclsJ4',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Gorilla', 'Chimpanzee', 'Lion', 'Rhino'],
                        answer: 'Gorilla'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the gorilla?',
                        options: ['Forest', 'Pond', 'Desert', 'Mountain'],
                        answer: 'Forest'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What was the gorilla doing first?',
                        options: ['Sitting', 'Running', 'Swimming', 'Jumping'],
                        answer: 'Sitting'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What did the gorilla pick up?',
                        options: ['Leaf', 'Fruit', 'Rock', 'Stick'],
                        answer: 'Leaf'
                    },
                    {
                        id: 'q5',
                        enabled: true,
                        question: 'What did the gorilla eat?',
                        options: ['Leaf', 'Fruit', 'Grass', 'Flower'],
                        answer: 'Leaf'
                    },
                    {
                        id: 'q6',
                        enabled: true,
                        question: 'Did the gorilla eat the leaf?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 8. CHIMPANZEE
            {
                id: 'chimpanzee-branch-001',
                title: 'Chimpanzee Playing',
                videoId: '9WXVjZo0ii0',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Chimpanzee', 'Gorilla', 'Monkey', 'Lion'],
                        answer: 'Chimpanzee'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the chimpanzee?',
                        options: ['Forest', 'Pond', 'Desert', 'Mountain'],
                        answer: 'Forest'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What did the chimpanzee climb?',
                        options: ['Branch', 'Rock', 'Wall', 'Hill'],
                        answer: 'Branch'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What did the chimpanzee do on the branch?',
                        options: ['Swing', 'Sleep', 'Eat', 'Drink'],
                        answer: 'Swing'
                    },
                    {
                        id: 'q5',
                        enabled: false,
                        question: 'Where did the chimpanzee land?',
                        options: ['Ground', 'Pond', 'Tree', 'Rock'],
                        answer: 'Ground'
                    },
                    {
                        id: 'q6',
                        enabled: true,
                        question: 'Did the chimpanzee swing?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 9. CROCODILE
            {
                id: 'crocodile-pond-001',
                title: 'Crocodile at the Pond',
                videoId: 'r-4_Dd4Mn_0',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Crocodile', 'Hippo', 'Rhino', 'Elephant'],
                        answer: 'Crocodile'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'Where was the crocodile?',
                        options: ['Pond', 'Forest', 'Mountain', 'Desert'],
                        answer: 'Pond'
                    },
                    {
                        id: 'q3',
                        enabled: false,
                        question: 'What did the crocodile do?',
                        options: ['Entered', 'Slept', 'Ran', 'Ate'],
                        answer: 'Entered'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'Where did the crocodile go?',
                        options: ['Water', 'Forest', 'Mountain', 'Grass'],
                        answer: 'Water'
                    },
                    {
                        id: 'q5',
                        enabled: false,
                        question: 'What made a splash?',
                        options: ['Tail', 'Head', 'Leg', 'Mouth'],
                        answer: 'Tail'
                    },
                    {
                        id: 'q6',
                        enabled: true,
                        question: 'Did the crocodile enter the water?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            },


            // 10. OSTRICH
            {
                id: 'ostrich-run-001',
                title: 'Ostrich Running',
                videoId: 'ElgBpN6nenM',
                questions: [
                    {
                        id: 'q1',
                        enabled: true,
                        question: 'What animal did you see?',
                        options: ['Ostrich', 'Zebra', 'Giraffe', 'Lion'],
                        answer: 'Ostrich'
                    },
                    {
                        id: 'q2',
                        enabled: true,
                        question: 'What was the ostrich doing first?',
                        options: ['Walking', 'Running', 'Sleeping', 'Eating'],
                        answer: 'Walking'
                    },
                    {
                        id: 'q3',
                        enabled: true,
                        question: 'What did the ostrich do next?',
                        options: ['Run', 'Sleep', 'Eat', 'Swim'],
                        answer: 'Run'
                    },
                    {
                        id: 'q4',
                        enabled: true,
                        question: 'What does the ostrich have?',
                        options: ['Long legs', 'Big ears', 'Short wings', 'Long trunk'],
                        answer: 'Long legs'
                    },
                    {
                        id: 'q5',
                        enabled: true,
                        question: 'Did the ostrich run?',
                        options: ['Yes', 'No'],
                        answer: 'Yes'
                    }
                ]
            }
        ]
    };

    window.MAVideoContent = window.MAVideoContent || { categories: {} };
    window.MAVideoContent.categories[africanAnimals.id] = africanAnimals;
})(window);
