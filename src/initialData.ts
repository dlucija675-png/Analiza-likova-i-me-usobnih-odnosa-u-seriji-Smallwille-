import { NetworkData } from './types';

export const initialData: NetworkData = {
  nodes: [
    // Kents & Close Friends
    { id: 'clark', name: 'Clark Kent', role: 'The Traveler', group: 'Kents', appearsIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { id: 'jonathan', name: 'Jonathan Kent', role: 'Father', group: 'Kents', appearsIn: [1, 2, 3, 4, 5] },
    { id: 'martha', name: 'Martha Kent', role: 'Mother', group: 'Kents', appearsIn: [1, 2, 3, 4, 5, 6, 9, 10] },
    { id: 'chloe', name: 'Chloe Sullivan', role: 'Watchtower', group: 'Friends', appearsIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { id: 'pete', name: 'Pete Ross', role: 'Best Friend (Early)', group: 'Friends', appearsIn: [1, 2, 3, 7] },
    { id: 'lana', name: 'Lana Lang', role: 'First Love', group: 'Friends', appearsIn: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: 'lois', name: 'Lois Lane', role: 'The One', group: 'Friends', appearsIn: [4, 5, 6, 7, 8, 9, 10] },

    // Luthors
    { id: 'lex', name: 'Lex Luthor', role: 'The Adversary', group: 'Luthors', appearsIn: [1, 2, 3, 4, 5, 6, 7, 10] },
    { id: 'lionel', name: 'Lionel Luthor', role: 'The MB', group: 'Luthors', appearsIn: [1, 2, 3, 4, 5, 6, 7, 10] },
    { id: 'tess', name: 'Tess Mercer', role: 'LuthorCorp CEO', group: 'Luthors', appearsIn: [8, 9, 10] },

    // Justice League
    { id: 'oliver', name: 'Oliver Queen', role: 'Green Arrow', group: 'Justice League', appearsIn: [6, 7, 8, 9, 10] },
    { id: 'ac', name: 'Arthur Curry', role: 'Aquaman', group: 'Justice League', appearsIn: [5, 6, 8, 10] },
    { id: 'victor', name: 'Victor Stone', role: 'Cyborg', group: 'Justice League', appearsIn: [5, 6, 9] },
    { id: 'bart', name: 'Bart Allen', role: 'Impulse', group: 'Justice League', appearsIn: [4, 6, 8, 10] },

    // Others
    { id: 'kara', name: 'Kara Kent', role: 'Supergirl', group: 'Kryptonians', appearsIn: [7, 8, 10] },
    { id: 'zod', name: 'General Zod', role: 'Kryptonian Villain', group: 'Kryptonians', appearsIn: [5, 6, 9, 10] },
    { id: 'brainiac', name: 'Brainiac', role: 'AI Villain', group: 'Kryptonians', appearsIn: [5, 7, 8] },
    { id: 'jor-el', name: 'Jor-El', role: 'Biological Father', group: 'Kryptonians', appearsIn: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
  ],
  links: [
    // Clark Core
    { source: 'clark', target: 'jonathan', type: 'Family', strength: 3, seasons: [1, 2, 3, 4, 5] },
    { source: 'clark', target: 'martha', type: 'Family', strength: 3, seasons: [1, 2, 3, 4, 5, 6, 9, 10] },
    { source: 'clark', target: 'chloe', type: 'Best Friends', strength: 3, seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { source: 'clark', target: 'lana', type: 'Romance (Former)', strength: 2, seasons: [1, 2, 3, 4, 5, 6, 7] },
    { source: 'clark', target: 'lois', type: 'Romance (True)', strength: 3, seasons: [4, 5, 6, 7, 8, 9, 10] },
    { source: 'clark', target: 'lex', type: 'Best Friends', strength: 4, seasons: [1, 2, 3, 4] },
    { source: 'clark', target: 'lex', type: 'Enemies', strength: 4, seasons: [5, 6, 7, 10] },
    { source: 'clark', target: 'oliver', type: 'Allies', strength: 2, seasons: [6, 7, 8, 9, 10] },
    { source: 'clark', target: 'kara', type: 'Cousins', strength: 1, seasons: [7, 8, 10] },
    { source: 'clark', target: 'jor-el', type: 'Guidance', strength: 1, seasons: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { source: 'clark', target: 'pete', type: 'Best Friend (Secret Keeper)', strength: 2, seasons: [1, 2, 3, 7] },
    { source: 'pete', target: 'jonathan', type: 'Trust', strength: 1, seasons: [1, 2, 3] },
    { source: 'pete', target: 'martha', type: 'Trust', strength: 1, seasons: [1, 2, 3] },

    // Kara Connections
    { source: 'kara', target: 'brainiac', type: 'Rivalry', strength: 1, seasons: [7] },
    { source: 'kara', target: 'martha', type: 'Family', strength: 1, seasons: [7, 10] },
    { source: 'kara', target: 'jonathan', type: 'Family', strength: 1, seasons: [10] },

    // Jor-El Connections
    { source: 'jor-el', target: 'jonathan', type: 'The Legacy', strength: 1, seasons: [2, 3, 4, 5] },
    { source: 'jor-el', target: 'lionel', type: 'Oracle/Host', strength: 2, seasons: [5, 6, 7] },

    // Luthors
    { source: 'lex', target: 'lionel', type: 'Son/Father Rivalry', strength: 4, seasons: [1, 2, 3, 4, 5, 6, 7] },
    { source: 'lex', target: 'tess', type: 'Successor', strength: 2, seasons: [8] },
    { source: 'lionel', target: 'tess', type: 'Biological Father', strength: 1, seasons: [10] },
    { source: 'lionel', target: 'martha', type: 'Friendship/Interest', strength: 1, seasons: [5, 6] },

    // Justice League Connections
    { source: 'oliver', target: 'chloe', type: 'Marriage', strength: 3, seasons: [9, 10] },
    { source: 'oliver', target: 'lois', type: 'Past Romance', strength: 1, seasons: [6] },
    { source: 'oliver', target: 'ac', type: 'Team', strength: 1, seasons: [6, 8, 10] },
    { source: 'oliver', target: 'victor', type: 'Team', strength: 1, seasons: [6, 9] },
    { source: 'oliver', target: 'bart', type: 'Team', strength: 1, seasons: [4, 6, 8, 10] },

    // Enemies & Other
    { source: 'clark', target: 'zod', type: 'Archenemies', strength: 2, seasons: [5, 6, 9, 10] },
    { source: 'clark', target: 'brainiac', type: 'Enemies', strength: 2, seasons: [5, 7, 8] },
    { source: 'lana', target: 'brainiac', type: 'Infection/Obsession', strength: 1, seasons: [7] },
    { source: 'lex', target: 'zod', type: 'Pawn/Host', strength: 2, seasons: [5, 6] },
    { source: 'chloe', target: 'brainiac', type: 'Infection', strength: 1, seasons: [8] },
  ]
};
