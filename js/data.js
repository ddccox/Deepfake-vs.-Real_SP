const CASES = [
   {
    id: 1,

    title: "The Candidate Speech",

    difficulty: "Easy",

    answer: "Fake",

    xp: 50,

    accuracy: 100,

    skillLearned: "Detecting Lip Synchronization Issues",

    investigatorNote:
        "Deepfake videos often reveal multiple inconsistencies rather than one obvious flaw. Always inspect several indicators before making your conclusion.",

    summary:
        "These indicators suggest AI-generated facial synthesis.",

    forensicAnalysis: [

        {

            indicator: "Lip Synchronization",

            explanation:
                "Detected mismatch between speech and mouth movement."

        },

        {

            indicator: "Lighting",

            explanation:
                "Face illumination differs from the surrounding environment."

        },

        {

            indicator: "Facial Boundary",

            explanation:
                "Visible blending artifacts around the jawline."

        }

    ]

}

];

