import { Quote, Topic, ClubInfo, ReadingItem } from '../types';

export const initialClubInfo: ClubInfo = {
  clubName: 'The Ethical Dilemma',
  schoolName: 'Brentwood High School',
  tagline: 'A forum for rigorous intellectual exploration and structured discourse, open to all students seeking deeper understanding.',
  classroom: 'Classroom S102',
  frequency: 'Every other Friday',
  scheduleDetail: 'After school, 3:30 PM - 5:00 PM',
  groupmeUrl: 'https://groupme.com/join_group/lyceum',
  presidentName: 'Julian Vance',
  facultyAdvisor: 'Dr. Eleanor Hayes, Dept. of Humanities',
  contactEmail: 'contact@ethicaldilemma-club.org',
  heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEykQszlCl7E2hrok8CotfSslwEefz-e_GVqcKe7BweMJNEesqiDcclcnChu75wsiLR4P0aESco3giKma8gMxew4uHbPq3muWZhhJXSFhtCQWa-5rWjp8J3auFAiM0X5e3VgqN-99wbaBgJ4DKxAusYFbrOfvq834iUyMVA-x6RhHVx3aF9zsIXzlRNnQ2FCBHbbkkXQZnToNCxklCdwH3QeKnpLBTqriMCX-1kKXdlXPvg7wZoone',
};

export const initialQuotes: Quote[] = [
  {
    id: 'quote-1',
    text: 'The unexamined life is not worth living.',
    author: 'Socrates',
    source: 'Apology / Historical Trial Accounts (399 BC)',
    activeWeek: '2026-08-20',
    status: 'active',
    era: 'Ancient',
    commentary:
      'Spoken at his trial in 399 BC, this profound statement challenges us to continuously question our beliefs, our actions, and the very nature of our existence. It remains a foundational pillar of philosophical inquiry.',
  },
  {
    id: 'quote-2',
    text: 'He who has a why to live for can bear almost any how.',
    author: 'Friedrich Nietzsche',
    source: 'Twilight of the Idols (1889)',
    activeWeek: '2026-08-10',
    status: 'archived',
    era: '19th Century',
    commentary:
      'A meditation on existential resilience, will to power, and discovering enduring personal purpose even in suffering.',
  },
  {
    id: 'quote-3',
    text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Will Durant',
    source: 'The Story of Philosophy (Summarizing Aristotle)',
    activeWeek: '2026-11-12',
    status: 'scheduled',
    era: '20th Century',
    commentary:
      'A core synthesis of Aristotle’s Nicomachean Ethics: virtue is an acquired disposition perfected through regular deliberate practice.',
  },
  {
    id: 'quote-4',
    text: 'Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.',
    author: 'Jean-Paul Sartre',
    source: 'Existentialism Is a Humanism (1946)',
    activeWeek: '2026-07-28',
    status: 'archived',
    era: '20th Century',
    commentary:
      'Sartre argues that existence precedes essence: without predefined destiny, every individual carries the radical weight of total freedom.',
  },
  {
    id: 'quote-5',
    text: 'I cannot teach anybody anything. I can only make them think.',
    author: 'Socrates',
    source: 'Historical Accounts / Socratic Dialogues',
    activeWeek: '2026-07-14',
    status: 'archived',
    era: 'Ancient',
    commentary:
      'The heart of dialectic inquiry: wisdom cannot be poured like water; it must be awakened through questioning and self-examination.',
  },
  {
    id: 'quote-6',
    text: 'The happiness of your life depends upon the quality of your thoughts.',
    author: 'Marcus Aurelius',
    source: 'Meditations, Book IV',
    activeWeek: '2026-09-01',
    status: 'scheduled',
    era: 'Ancient',
    commentary:
      'Stoic psychological discipline: external events cannot harm the soul unless accompanied by our subjective judgments.',
  },
];

export const initialTopics: Topic[] = [
  {
    id: 'topic-1',
    title: 'Existentialism & Meaning',
    description:
      'Examining the human condition, freedom, and the inherent search for purpose in an arguably absurd universe. We delve into Sartre, Camus, and Kierkegaard.',
    category: 'Existentialism & Meaning',
    resourceLink: 'https://plato.stanford.edu/entries/existentialism/',
    isWide: false,
    keyThinkers: ['Jean-Paul Sartre', 'Albert Camus', 'Søren Kierkegaard', 'Simone de Beauvoir'],
    discussionQuestions: [
      'If the universe lacks inherent meaning, does that liberate human choice or induce existential dread?',
      'How does Camus’ concept of the Myth of Sisyphus reframe daily routine?',
      'Can one live authentically in a society governed by digital conformity?',
    ],
  },
  {
    id: 'topic-2',
    title: 'Ethics in the Age of AI',
    description:
      'Navigating the moral landscape of artificial intelligence, machine learning algorithms, autonomous decision systems, and the impending questions of machine consciousness and algorithmic bias.',
    category: 'Ethics & Moral Philosophy',
    resourceLink: 'https://plato.stanford.edu/entries/ethics-ai/',
    isWide: false,
    keyThinkers: ['Nick Bostrom', 'Shannon Vallor', 'Luciano Floridi', 'Max Tegmark'],
    discussionQuestions: [
      'Should autonomous decision-makers adopt utilitarian or deontological frameworks in life-or-death dilemmas?',
      'Can an artificial neural network ever possess subjective experience (qualia)?',
      'Who bears moral responsibility when an autonomous algorithm causes harm?',
    ],
  },
  {
    id: 'topic-3',
    title: 'Stoicism for Modern Life',
    description:
      'Applying the ancient wisdom of Epictetus, Seneca, and Marcus Aurelius to contemporary challenges, focusing on resilience, virtue, and emotional regulation amidst societal chaos.',
    category: 'Ethics & Moral Philosophy',
    resourceLink: 'https://plato.stanford.edu/entries/stoicism/',
    isWide: false,
    keyThinkers: ['Marcus Aurelius', 'Epictetus', 'Seneca the Younger', 'Zeno of Citium'],
    discussionQuestions: [
      'What lies truly within our control versus outside our sphere of influence?',
      'Is the Stoic ideal of apatheia (freedom from passion) emotionally healthy or repressing?',
      'How can voluntary discomfort build resilience in a comfort-oriented world?',
    ],
  },
  {
    id: 'topic-4',
    title: 'Political Philosophy & The Social Contract',
    description:
      'Analyzing structures of power, justice, authority, and civic duty. Discussions range from Plato’s Republic to Rawlsian theories of distributive justice and the veil of ignorance.',
    category: 'Political Philosophy',
    resourceLink: 'https://plato.stanford.edu/entries/rawls/',
    isWide: false,
    keyThinkers: ['John Rawls', 'Plato', 'Thomas Hobbes', 'Hannah Arendt'],
    discussionQuestions: [
      'What social rules would you establish if you did not know your wealth, status, or identity beforehand?',
      'Does the state derive legitimacy from consent or from maintaining order?',
      'Where does individual liberty end when collective safety is threatened?',
    ],
  },
  {
    id: 'topic-5',
    title: 'Epistemology & The Nature of Truth',
    description:
      'How do we know what we claim to know? Investigating the foundations of knowledge, justified true belief, skepticism, and the scientific method in a post-truth era.',
    category: 'Epistemology',
    resourceLink: 'https://plato.stanford.edu/entries/epistemology/',
    isWide: true,
    keyThinkers: ['René Descartes', 'David Hume', 'Karl Popper', 'Edmund Gettier'],
    discussionQuestions: [
      'Can we prove with certainty that we are not living in a simulation or dream?',
      'What separates justified knowledge from strong intuition or coincidence?',
      'How does scientific falsificationism define what counts as empirical truth?',
    ],
  },
];

export const initialReadingList: ReadingItem[] = [
  {
    id: 'read-1',
    title: 'The Republic',
    author: 'Plato',
    era: 'Classical Greece (c. 375 BC)',
    category: 'Political Philosophy & Epistemology',
    description: 'The foundational Socratic dialogue examining justice, the ideal city-state, the Allegory of the Cave, and philosopher kings.',
    readTime: 'Essential Core Text',
    link: 'https://www.gutenberg.org/ebooks/1497',
  },
  {
    id: 'read-2',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    era: 'Roman Stoicism (c. 180 AD)',
    category: 'Stoicism & Ethics',
    description: 'Private personal journals of the Roman Emperor reflecting on stoic duty, cosmic reason, mortality, and tranquility.',
    readTime: 'Short Daily Readings',
    link: 'https://www.gutenberg.org/ebooks/2680',
  },
  {
    id: 'read-3',
    title: 'A Theory of Justice',
    author: 'John Rawls',
    era: 'Contemporary (1971)',
    category: 'Political Philosophy',
    description: 'Introduces the transformative Original Position and Veil of Ignorance to construct a fair, egalitarian society.',
    readTime: 'Advanced Seminar Text',
    link: 'https://plato.stanford.edu/entries/rawls/',
  },
  {
    id: 'read-4',
    title: 'The Myth of Sisyphus',
    author: 'Albert Camus',
    era: '20th Century (1942)',
    category: 'Existentialism',
    description: 'Explores the philosophy of the absurd and why one must imagine Sisyphus happy as an act of courageous rebellion.',
    readTime: 'Essays (120 pages)',
    link: 'https://plato.stanford.edu/entries/camus/',
  },
  {
    id: 'read-5',
    title: 'Nicomachean Ethics',
    author: 'Aristotle',
    era: 'Classical Greece (c. 340 BC)',
    category: 'Virtue Ethics',
    description: 'The pursuit of Eudaimonia (human flourishing) through the doctrine of the mean and habituation of moral virtues.',
    readTime: 'Core Classical Text',
    link: 'https://www.gutenberg.org/ebooks/8438',
  },
];
