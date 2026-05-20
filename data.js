/**
 * ============================================
 * NCERT QUIZ DATA - SCALABLE STRUCTURE
 * ============================================
 * 
 * This file contains the quiz data structure.
 * TEMPLATE FOR ADDING MORE QUESTIONS:
 * 
 * 1. Copy the structure below
 * 2. Add new objects to the questions array
 * 3. Each question must have:
 *    - id: unique number
 *    - text: question string
 *    - options: array of 4 options
 *    - correctOption: index of correct option (0-3)
 *    - explanation: brief explanation of correct answer
 * 
 * CURRENT DATA: 5 Sample questions per subject (Class 12 only)
 * EXPANDABLE: Add up to 100+ questions per subject
 */

const quizData = {
    10: {
        name: "Class 10",
        subjects: ['Science', 'Mathematics', 'English']
    },
    11: {
        name: "Class 11",
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English']
    },
    12: {
        name: "Class 12",
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English']
    }
};

// ============================================
// CLASS 12 - PHYSICS
// ============================================
const class12Physics = [
    {
        id: 1,
        text: "What is the SI unit of electric charge?",
        options: [
            "Ampere",
            "Coulomb",
            "Ohm",
            "Volt"
        ],
        correctOption: 1,
        explanation: "The SI unit of electric charge is Coulomb (C), named after French physicist Charles-Augustin de Coulomb."
    },
    {
        id: 2,
        text: "A body moving with constant acceleration has an initial velocity of 5 m/s. If the acceleration is 2 m/s², what will be its velocity after 10 seconds?",
        options: [
            "15 m/s",
            "20 m/s",
            "25 m/s",
            "30 m/s"
        ],
        correctOption: 2,
        explanation: "Using v = u + at: v = 5 + (2 × 10) = 5 + 20 = 25 m/s."
    },
    {
        id: 3,
        text: "What is the relationship between electric field and electric potential?",
        options: [
            "E = V²",
            "E = -dV/dx",
            "E = V/d",
            "E = V + d"
        ],
        correctOption: 1,
        explanation: "The electric field is the negative gradient of the electric potential: E = -dV/dx. The field points from high to low potential."
    },
    {
        id: 4,
        text: "Which of the following has the highest specific heat capacity among these substances?",
        options: [
            "Iron",
            "Copper",
            "Water",
            "Aluminum"
        ],
        correctOption: 2,
        explanation: "Water has the highest specific heat capacity (4200 J/kg·K) among common substances, making it excellent for thermal regulation."
    },
    {
        id: 5,
        text: "What is the frequency of electromagnetic wave if its wavelength is 300 m and it travels in vacuum?",
        options: [
            "1 × 10⁶ Hz",
            "1 × 10⁷ Hz",
            "1 × 10⁸ Hz",
            "1 × 10⁹ Hz"
        ],
        correctOption: 0,
        explanation: "Using c = λf, where c = 3 × 10⁸ m/s: f = c/λ = (3 × 10⁸)/300 = 1 × 10⁶ Hz."
    }
];

// ============================================
// CLASS 12 - CHEMISTRY
// ============================================
const class12Chemistry = [
    {
        id: 1,
        text: "What is the general formula for alkanes?",
        options: [
            "CₙH₂ₙ",
            "CₙH₂ₙ₊₂",
            "CₙHₙ",
            "CₙH₂ₙ₋₂"
        ],
        correctOption: 1,
        explanation: "Alkanes are saturated hydrocarbons with the general formula CₙH₂ₙ₊₂, containing only single C-C bonds. Examples: CH₄, C₂H₆, C₃H₈."
    },
    {
        id: 2,
        text: "Which of the following is a reducing sugar?",
        options: [
            "Sucrose",
            "Glucose",
            "Maltose",
            "Both B and C"
        ],
        correctOption: 3,
        explanation: "Reducing sugars are those with a free aldehyde or ketone group. Glucose and maltose are reducing sugars, while sucrose is a non-reducing sugar."
    },
    {
        id: 3,
        text: "What is the oxidation state of Chromium in K₂Cr₂O₇?",
        options: [
            "+2",
            "+3",
            "+5",
            "+6"
        ],
        correctOption: 3,
        explanation: "In K₂Cr₂O₇: K is +1, O is -2. If Cr is x: 2(+1) + 2(x) + 7(-2) = 0; 2 + 2x - 14 = 0; x = +6."
    },
    {
        id: 4,
        text: "Which gas is produced when Zinc reacts with dilute Sulfuric acid?",
        options: [
            "Oxygen",
            "Hydrogen",
            "Nitrogen",
            "Chlorine"
        ],
        correctOption: 1,
        explanation: "Zn + H₂SO₄ → ZnSO₄ + H₂↑. Hydrogen gas is released in this displacement reaction."
    },
    {
        id: 5,
        text: "What is the IUPAC name of CH₃CH(OH)CH₂CH₃?",
        options: [
            "1-Butanol",
            "2-Butanol",
            "2-Methylpropanol",
            "n-Butanol"
        ],
        correctOption: 1,
        explanation: "The -OH group is on the second carbon, making it 2-Butanol (or 2-Butyl alcohol). Numbering starts from the end nearest to -OH."
    }
];

// ============================================
// CLASS 12 - MATHEMATICS
// ============================================
const class12Mathematics = [
    {
        id: 1,
        text: "If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∪ B?",
        options: [
            "{2, 3}",
            "{1, 2, 3}",
            "{1, 2, 3, 4}",
            "{2, 3, 4}"
        ],
        correctOption: 2,
        explanation: "A ∪ B (union) contains all elements that are in A or B or both. Therefore, A ∪ B = {1, 2, 3, 4}."
    },
    {
        id: 2,
        text: "Find the derivative of f(x) = 3x² + 2x + 1 with respect to x.",
        options: [
            "6x + 2",
            "6x² + 2",
            "3x + 2",
            "6x + 1"
        ],
        correctOption: 0,
        explanation: "Using the power rule: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(1) = 0. Therefore, f'(x) = 6x + 2."
    },
    {
        id: 3,
        text: "What is the probability of getting a sum of 7 when two dice are thrown?",
        options: [
            "1/6",
            "1/12",
            "1/9",
            "1/18"
        ],
        correctOption: 0,
        explanation: "Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Total outcomes = 36. P = 6/36 = 1/6."
    },
    {
        id: 4,
        text: "If sin θ = 3/5 and θ is in the first quadrant, what is cos θ?",
        options: [
            "4/5",
            "3/4",
            "5/3",
            "4/3"
        ],
        correctOption: 0,
        explanation: "Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1; 9/25 + cos²θ = 1; cos²θ = 16/25; cos θ = 4/5 (positive in first quadrant)."
    },
    {
        id: 5,
        text: "What is the sum of the infinite geometric series 1 + 1/2 + 1/4 + 1/8 + ...?",
        options: [
            "1.5",
            "2",
            "2.5",
            "3"
        ],
        correctOption: 1,
        explanation: "For an infinite GP with a = 1 and r = 1/2: S∞ = a/(1-r) = 1/(1-1/2) = 1/(1/2) = 2."
    }
];

// ============================================
// MASTER QUIZ DATABASE
// ============================================
const quizDatabase = {
    12: {
        'Physics': class12Physics,
        'Chemistry': class12Chemistry,
        'Mathematics': class12Mathematics
    }
};

/**
 * ============================================
 * HOW TO ADD MORE QUESTIONS
 * ============================================
 * 
 * STEP 1: Create a new constant for your subject
 * const class12Biology = [
 *     {
 *         id: 1,
 *         text: "Your question here?",
 *         options: ["Option A", "Option B", "Option C", "Option D"],
 *         correctOption: 0,
 *         explanation: "Explanation of the correct answer."
 *     },
 *     // ... add more questions (up to 100+)
 * ];
 * 
 * STEP 2: Add to quizDatabase
 * quizDatabase[12] = {
 *     'Physics': class12Physics,
 *     'Chemistry': class12Chemistry,
 *     'Mathematics': class12Mathematics,
 *     'Biology': class12Biology  // NEW
 * };
 * 
 * STEP 3: Update quizData to include new subject
 * quizData[12].subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
 * 
 * BULK ADDITION FOR 100+ QUESTIONS:
 * For adding large datasets, organize them in parts:
 * 
 * const class12PhysicsBasic = [... questions 1-25 ...];
 * const class12PhysicsIntermediate = [... questions 26-50 ...];
 * const class12PhysicsAdvanced = [... questions 51-75 ...];
 * const class12PhysicsExpert = [... questions 76-100+ ...];
 * 
 * Then concatenate:
 * const class12FullPhysics = [
 *     ...class12PhysicsBasic,
 *     ...class12PhysicsIntermediate,
 *     ...class12PhysicsAdvanced,
 *     ...class12PhysicsExpert
 * ];
 * 
 * Finally update the database:
 * quizDatabase[12]['Physics'] = class12FullPhysics;
 */
