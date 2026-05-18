import { NetworkData } from './types';

export const initialData: NetworkData = {
  nodes: [
    // Kents & Close Friends
    { id: 'clark', name: 'Clark Kent', role: 'The Traveler', group: 'Kents' },
    { id: 'jonathan', name: 'Jonathan Kent', role: 'Father', group: 'Kents' },
    { id: 'martha', name: 'Martha Kent', role: 'Mother', group: 'Kents' },
    { id: 'chloe', name: 'Chloe Sullivan', role: 'Watchtower', group: 'Friends' },
    { id: 'pete', name: 'Pete Ross', role: 'Best Friend (Early)', group: 'Friends' },
    { id: 'lana', name: 'Lana Lang', role: 'First Love', group: 'Friends' },
    { id: 'lois', name: 'Lois Lane', role: 'The One', group: 'Friends' },

    // Luthors
    { id: 'lex', name: 'Lex Luthor', role: 'The Adversary', group: 'Luthors' },
    { id: 'lionel', name: 'Lionel Luthor', role: 'The MB', group: 'Luthors' },
    { id: 'tess', name: 'Tess Mercer', role: 'LuthorCorp CEO', group: 'Luthors' },

    // Justice League
    { id: 'oliver', name: 'Oliver Queen', role: 'Green Arrow', group: 'Justice League' },
    { id: 'ac', name: 'Arthur Curry', role: 'Aquaman', group: 'Justice League' },
    { id: 'victor', name: 'Victor Stone', role: 'Cyborg', group: 'Justice League' },
    { id: 'bart', name: 'Bart Allen', role: 'Impulse', group: 'Justice League' },

    // Others
    { id: 'kara', name: 'Kara Kent', role: 'Supergirl', group: 'Kryptonians' },
    { id: 'zod', name: 'General Zod', role: 'Kryptonian Villain', group: 'Kryptonians' },
    { id: 'brainiac', name: 'Brainiac', role: 'AI Villain', group: 'Kryptonians' },
    { id: 'jor-el', name: 'Jor-El', role: 'Biological Father', group: 'Kryptonians' },
  ],
  links: [
    // Clark Core
    { source: 'clark', target: 'jonathan', type: 'Family', strength: 3 },
    { source: 'clark', target: 'martha', type: 'Family', strength: 3 },
    { source: 'clark', target: 'chloe', type: 'Best Friends', strength: 3 },
    { source: 'clark', target: 'lana', type: 'Romance (Former)', strength: 2 },
    { source: 'clark', target: 'lois', type: 'Romance (True)', strength: 3 },
    { source: 'clark', target: 'lex', type: 'Best Friends -> Enemies', strength: 4 },
    { source: 'clark', target: 'oliver', type: 'Allies', strength: 2 },
    { source: 'clark', target: 'kara', type: 'Cousins', strength: 1 },
    { source: 'clark', target: 'jor-el', type: 'Guidance', strength: 1 },
    { source: 'clark', target: 'pete', type: 'Best Friend (Secret Keeper)', strength: 2 },
    { source: 'pete', target: 'jonathan', type: 'Trust', strength: 1 },
    { source: 'pete', target: 'martha', type: 'Trust', strength: 1 },

    // Kara Connections
    { source: 'kara', target: 'brainiac', type: 'Rivalry', strength: 1 },
    { source: 'kara', target: 'martha', type: 'Family', strength: 1 },
    { source: 'kara', target: 'jonathan', type: 'Family', strength: 1 },

    // Jor-El Connections
    { source: 'jor-el', target: 'jonathan', type: 'The Legacy', strength: 1 },
    { source: 'jor-el', target: 'lionel', type: 'Oracle/Host', strength: 2 },

    // Luthors
    { source: 'lex', target: 'lionel', type: 'Son/Father Rivalry', strength: 4 },
    { source: 'lex', target: 'tess', type: 'Successor', strength: 2 },
    { source: 'lionel', target: 'tess', type: 'Biological Father', strength: 1 },
    { source: 'lionel', target: 'martha', type: 'Friendship/Interest', strength: 1 },

    // Justice League Connections
    { source: 'oliver', target: 'chloe', type: 'Marriage', strength: 3 },
    { source: 'oliver', target: 'lois', type: 'Past Romance', strength: 1 },
    { source: 'oliver', target: 'ac', type: 'Team', strength: 1 },
    { source: 'oliver', target: 'victor', type: 'Team', strength: 1 },
    { source: 'oliver', target: 'bart', type: 'Team', strength: 1 },

    // Enemies & Other
    { source: 'clark', target: 'zod', type: 'Archenemies', strength: 2 },
    { source: 'clark', target: 'brainiac', type: 'Enemies', strength: 2 },
    { source: 'lana', target: 'brainiac', type: 'Infection/Obsession', strength: 1 },
    { source: 'lex', target: 'zod', type: 'Pawn/Host', strength: 2 },
    { source: 'chloe', target: 'brainiac', type: 'Infection', strength: 1 },
  ]
};
