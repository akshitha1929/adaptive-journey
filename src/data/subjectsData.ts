import { Subject, Chapter, Subtopic } from '@/types/subjects';

// Helper to generate subtopics
const createSubtopics = (chapterId: string, topics: { title: string; explanation: string }[]): Subtopic[] => {
  return topics.map((topic, index) => ({
    id: `${chapterId}-st-${index + 1}`,
    title: topic.title,
    explanation: topic.explanation,
    completed: false,
  }));
};

// Generate subjects based on academic details
export const getSubjects = (classGrade: string, board: string, electives: string[]): Subject[] => {
  const classNum = parseInt(classGrade) || 0;
  const baseSubjects: Subject[] = [];

  // Mathematics
  baseSubjects.push({
    name: 'Mathematics',
    icon: '📐',
    color: 'primary',
    chapters: [
      {
        id: 'math-1',
        name: 'Number Systems',
        completed: false,
        locked: false,
        subtopics: createSubtopics('math-1', [
          { title: 'Introduction to Numbers', explanation: 'Understand natural numbers, whole numbers, integers, and their properties. Learn how numbers form the foundation of mathematics.' },
          { title: 'Rational Numbers', explanation: 'Explore fractions and decimals as rational numbers. Understand representation on number line and operations.' },
          { title: 'Irrational Numbers', explanation: 'Discover numbers that cannot be expressed as fractions. Learn about √2, π and their decimal expansions.' },
          { title: 'Real Number Operations', explanation: 'Master addition, subtraction, multiplication and division of real numbers with practical examples.' },
        ]),
      },
      {
        id: 'math-2',
        name: 'Algebra Basics',
        completed: false,
        locked: false,
        subtopics: createSubtopics('math-2', [
          { title: 'Variables and Expressions', explanation: 'Learn to use letters to represent unknown values. Understand how to form and simplify algebraic expressions.' },
          { title: 'Linear Equations', explanation: 'Solve equations with one variable. Apply step-by-step methods to find unknown values.' },
          { title: 'Polynomials', explanation: 'Understand terms, coefficients, and degrees. Learn to add, subtract, and multiply polynomials.' },
        ]),
      },
      {
        id: 'math-3',
        name: 'Geometry',
        completed: false,
        locked: false,
        subtopics: createSubtopics('math-3', [
          { title: 'Points, Lines, and Planes', explanation: 'Fundamental concepts of geometry. Learn about collinear points, intersecting lines, and parallel lines.' },
          { title: 'Angles and Triangles', explanation: 'Types of angles and their measurements. Properties of triangles including sum of angles theorem.' },
          { title: 'Circles and Their Properties', explanation: 'Parts of a circle: radius, diameter, chord, arc. Learn about circumference and area calculations.' },
        ]),
      },
      {
        id: 'math-4',
        name: 'Statistics',
        completed: false,
        locked: true,
        subtopics: createSubtopics('math-4', [
          { title: 'Data Collection', explanation: 'Methods of collecting and organizing data. Understanding primary and secondary data sources.' },
          { title: 'Measures of Central Tendency', explanation: 'Calculate mean, median, and mode. Know when to use each measure.' },
        ]),
      },
      {
        id: 'math-5',
        name: 'Probability',
        completed: false,
        locked: true,
        subtopics: createSubtopics('math-5', [
          { title: 'Basic Probability', explanation: 'Introduction to likelihood and chance. Calculate probability of simple events.' },
          { title: 'Compound Events', explanation: 'Probability of combined events. Independent and dependent events explained.' },
        ]),
      },
    ],
  });

  // Science
  baseSubjects.push({
    name: 'Science',
    icon: '🔬',
    color: 'accent',
    chapters: [
      {
        id: 'sci-1',
        name: 'Matter and Materials',
        completed: false,
        locked: false,
        subtopics: createSubtopics('sci-1', [
          { title: 'States of Matter', explanation: 'Explore solids, liquids, and gases. Understand particle arrangement and movement in each state.' },
          { title: 'Physical and Chemical Changes', explanation: 'Differentiate between reversible physical changes and irreversible chemical changes with examples.' },
          { title: 'Elements and Compounds', explanation: 'Learn what makes up matter at the atomic level. Understand chemical formulas and bonding basics.' },
        ]),
      },
      {
        id: 'sci-2',
        name: 'Living World',
        completed: false,
        locked: false,
        subtopics: createSubtopics('sci-2', [
          { title: 'Cell Structure', explanation: 'The building blocks of life. Explore plant and animal cells, organelles, and their functions.' },
          { title: 'Classification of Living Things', explanation: 'How scientists organize life into kingdoms. Learn taxonomy from domain to species.' },
          { title: 'Body Systems Overview', explanation: 'Introduction to digestive, respiratory, and circulatory systems and how they work together.' },
        ]),
      },
      {
        id: 'sci-3',
        name: 'Motion and Force',
        completed: false,
        locked: false,
        subtopics: createSubtopics('sci-3', [
          { title: 'Types of Motion', explanation: 'Linear, circular, and periodic motion explained with real-world examples.' },
          { title: 'Newton\'s Laws', explanation: 'The three fundamental laws of motion. Understand inertia, acceleration, and action-reaction.' },
          { title: 'Friction and Gravity', explanation: 'Forces that affect motion. How friction opposes movement and gravity attracts objects.' },
        ]),
      },
      {
        id: 'sci-4',
        name: 'Energy',
        completed: false,
        locked: true,
        subtopics: createSubtopics('sci-4', [
          { title: 'Forms of Energy', explanation: 'Kinetic, potential, thermal, and other energy types. Energy cannot be created or destroyed.' },
          { title: 'Energy Transformation', explanation: 'How energy changes from one form to another in everyday devices and natural processes.' },
        ]),
      },
    ],
  });

  // English
  baseSubjects.push({
    name: 'English',
    icon: '📖',
    color: 'highlight',
    chapters: [
      {
        id: 'eng-1',
        name: 'Reading Comprehension',
        completed: false,
        locked: false,
        subtopics: createSubtopics('eng-1', [
          { title: 'Active Reading Strategies', explanation: 'Techniques to engage with text: previewing, questioning, and summarizing as you read.' },
          { title: 'Finding Main Ideas', explanation: 'Identify central themes and supporting details. Distinguish between explicit and implicit information.' },
          { title: 'Making Inferences', explanation: 'Read between the lines. Use context clues to understand unstated meanings.' },
        ]),
      },
      {
        id: 'eng-2',
        name: 'Grammar Essentials',
        completed: false,
        locked: false,
        subtopics: createSubtopics('eng-2', [
          { title: 'Parts of Speech', explanation: 'Nouns, verbs, adjectives, adverbs, and more. Building blocks of sentences explained.' },
          { title: 'Sentence Structure', explanation: 'Simple, compound, and complex sentences. Learn to vary your writing for better flow.' },
          { title: 'Punctuation Rules', explanation: 'When to use commas, semicolons, and other marks. Clear writing through proper punctuation.' },
        ]),
      },
      {
        id: 'eng-3',
        name: 'Writing Skills',
        completed: false,
        locked: false,
        subtopics: createSubtopics('eng-3', [
          { title: 'Paragraph Writing', explanation: 'Structure paragraphs with topic sentences, supporting details, and conclusions.' },
          { title: 'Essay Organization', explanation: 'Introduction, body, and conclusion. Create logical flow in longer writing pieces.' },
          { title: 'Descriptive Writing', explanation: 'Use sensory details and vivid language to paint pictures with words.' },
        ]),
      },
      {
        id: 'eng-4',
        name: 'Literature',
        completed: false,
        locked: true,
        subtopics: createSubtopics('eng-4', [
          { title: 'Story Elements', explanation: 'Plot, character, setting, theme, and conflict. Analyze how stories are constructed.' },
          { title: 'Poetry Basics', explanation: 'Rhythm, rhyme, and figurative language. Appreciate the beauty of poetic expression.' },
        ]),
      },
    ],
  });

  // Social Studies for lower classes
  if (classNum <= 10) {
    baseSubjects.push({
      name: 'Social Studies',
      icon: '🌍',
      color: 'success',
      chapters: [
        {
          id: 'sst-1',
          name: 'History: Ancient Civilizations',
          completed: false,
          locked: false,
          subtopics: createSubtopics('sst-1', [
            { title: 'Early Human Settlements', explanation: 'How humans transitioned from nomadic life to farming. The birth of villages and towns.' },
            { title: 'Mesopotamia and Egypt', explanation: 'River valley civilizations. Inventions like writing, the wheel, and monumental architecture.' },
            { title: 'Ancient India', explanation: 'Indus Valley Civilization. Urban planning, trade, and cultural achievements of early India.' },
          ]),
        },
        {
          id: 'sst-2',
          name: 'Geography: Our Earth',
          completed: false,
          locked: false,
          subtopics: createSubtopics('sst-2', [
            { title: 'Landforms', explanation: 'Mountains, plateaus, plains, and valleys. How geological forces shape our landscape.' },
            { title: 'Climate and Weather', explanation: 'Difference between weather and climate. Factors affecting climate zones worldwide.' },
            { title: 'Maps and Globes', explanation: 'Reading maps, understanding scale, and using coordinates. Navigation basics.' },
          ]),
        },
        {
          id: 'sst-3',
          name: 'Civics: Democracy',
          completed: false,
          locked: true,
          subtopics: createSubtopics('sst-3', [
            { title: 'What is Democracy?', explanation: 'Government by the people. Comparing democracy with other forms of government.' },
            { title: 'Rights and Responsibilities', explanation: 'Fundamental rights of citizens. Understanding duties that come with freedom.' },
          ]),
        },
      ],
    });
  }

  // Add electives
  electives.forEach((elective) => {
    if (elective === 'Computer Science') {
      baseSubjects.push({
        name: 'Computer Science',
        icon: '💻',
        color: 'primary',
        chapters: [
          {
            id: 'cs-1',
            name: 'Introduction to Programming',
            completed: false,
            locked: false,
            subtopics: createSubtopics('cs-1', [
              { title: 'What is Programming?', explanation: 'How computers understand instructions. Introduction to algorithms and logical thinking.' },
              { title: 'Variables and Data Types', explanation: 'Storing information in programs. Numbers, text, and boolean values explained.' },
              { title: 'Control Flow', explanation: 'Making decisions in code with if-else statements. Repeating actions with loops.' },
            ]),
          },
          {
            id: 'cs-2',
            name: 'Web Basics',
            completed: false,
            locked: false,
            subtopics: createSubtopics('cs-2', [
              { title: 'HTML Fundamentals', explanation: 'Structure web pages with tags. Create headings, paragraphs, links, and images.' },
              { title: 'CSS Styling', explanation: 'Make websites beautiful. Colors, fonts, layouts, and responsive design basics.' },
            ]),
          },
          {
            id: 'cs-3',
            name: 'Data Handling',
            completed: false,
            locked: true,
            subtopics: createSubtopics('cs-3', [
              { title: 'Arrays and Lists', explanation: 'Store multiple values together. Access, modify, and iterate through collections.' },
              { title: 'File Operations', explanation: 'Read from and write to files. Persistent data storage concepts.' },
            ]),
          },
        ],
      });
    }
    if (elective === 'Music') {
      baseSubjects.push({
        name: 'Music',
        icon: '🎵',
        color: 'accent',
        chapters: [
          {
            id: 'mus-1',
            name: 'Basic Notes & Rhythm',
            completed: false,
            locked: false,
            subtopics: createSubtopics('mus-1', [
              { title: 'Musical Notes', explanation: 'The seven notes of music. Understanding pitch and how notes are written on staff.' },
              { title: 'Rhythm and Beat', explanation: 'Timing in music. Note values, time signatures, and keeping a steady beat.' },
            ]),
          },
          {
            id: 'mus-2',
            name: 'Instrument Basics',
            completed: false,
            locked: false,
            subtopics: createSubtopics('mus-2', [
              { title: 'String Instruments', explanation: 'Guitar, violin, and more. How vibrating strings produce different sounds.' },
              { title: 'Percussion Introduction', explanation: 'Drums, tabla, and rhythm instruments. The heartbeat of music explained.' },
            ]),
          },
        ],
      });
    }
  });

  return baseSubjects;
};
