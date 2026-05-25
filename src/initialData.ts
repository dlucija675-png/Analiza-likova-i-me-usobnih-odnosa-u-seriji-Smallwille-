import { NetworkData } from './types';

export const initialData: NetworkData = {
  nodes: [
    // Kents & Close Friends
    { 
      id: 'clark', 
      name: 'Clark Kent', 
      role: 'The Traveler / Superman', 
      group: 'Kents', 
      origin: 'Kriptonac', 
      morality: 'Heroj', 
      actor: 'Tom Welling', 
      appearsIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
    },
    { 
      id: 'jonathan', 
      name: 'Jonathan Kent', 
      role: 'Usvojeni otac', 
      group: 'Kents', 
      origin: 'Čovek', 
      morality: 'Heroj', 
      actor: 'John Schneider', 
      appearsIn: [1, 2, 3, 4, 5] 
    },
    { 
      id: 'martha', 
      name: 'Martha Kent', 
      role: 'Usvojena majka', 
      group: 'Kents', 
      origin: 'Čovek', 
      morality: 'Heroj', 
      actor: 'Annette O\'Toole', 
      appearsIn: [1, 2, 3, 4, 5, 6, 9, 10] 
    },
    { 
      id: 'chloe', 
      name: 'Chloe Sullivan', 
      role: 'Watchtower / Novinarka', 
      group: 'Friends', 
      origin: 'Kometni mutant', 
      morality: 'Heroj', 
      actor: 'Allison Mack', 
      appearsIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
    },
    { 
      id: 'pete', 
      name: 'Pete Ross', 
      role: 'Najbolji prijatelj iz djetinjstva', 
      group: 'Friends', 
      origin: 'Čovek', 
      morality: 'Heroj', 
      actor: 'Sam Jones III', 
      appearsIn: [1, 2, 3, 7] 
    },
    { 
      id: 'lana', 
      name: 'Lana Lang', 
      role: 'Prva Clarkova ljubav', 
      group: 'Friends', 
      origin: 'Čovek', 
      morality: 'Neutralan', 
      actor: 'Kristin Kreuk', 
      appearsIn: [1, 2, 3, 4, 5, 6, 7, 8] 
    },
    { 
      id: 'lois', 
      name: 'Lois Lane', 
      role: 'Novinarka Daily Planeta', 
      group: 'Friends', 
      origin: 'Čovek', 
      morality: 'Heroj', 
      actor: 'Erica Durance', 
      appearsIn: [4, 5, 6, 7, 8, 9, 10] 
    },

    // Luthors
    { 
      id: 'lex', 
      name: 'Lex Luthor', 
      role: 'Glavni suparnik i antagonist', 
      group: 'Luthors', 
      origin: 'Čovek', 
      morality: 'Negativac', 
      actor: 'Michael Rosenbaum', 
      appearsIn: [1, 2, 3, 4, 5, 6, 7, 10] 
    },
    { 
      id: 'lionel', 
      name: 'Lionel Luthor', 
      role: 'Osnivač LuthorCorpa', 
      group: 'Luthors', 
      origin: 'Čovek', 
      morality: 'Anti-heroj', 
      actor: 'John Glover', 
      appearsIn: [1, 2, 3, 4, 5, 6, 7, 10] 
    },
    { 
      id: 'tess', 
      name: 'Tess Mercer', 
      role: 'Izvršna direktorica LuthorCorpa', 
      group: 'Luthors', 
      origin: 'Čovek', 
      morality: 'Anti-heroj', 
      actor: 'Cassidy Freeman', 
      appearsIn: [8, 9, 10] 
    },

    // Justice League
    { 
      id: 'oliver', 
      name: 'Oliver Queen', 
      role: 'Green Arrow', 
      group: 'Justice League', 
      origin: 'Čovek', 
      morality: 'Heroj', 
      actor: 'Justin Hartley', 
      appearsIn: [6, 7, 8, 9, 10] 
    },
    { 
      id: 'ac', 
      name: 'Arthur Curry', 
      role: 'Aquaman', 
      group: 'Justice League', 
      origin: 'Čovek', 
      morality: 'Heroj', 
      actor: 'Alan Ritchson', 
      appearsIn: [5, 6, 8, 10] 
    },
    { 
      id: 'victor', 
      name: 'Victor Stone', 
      role: 'Cyborg / Tehno-heroj', 
      group: 'Justice League', 
      origin: 'Kiborg', 
      morality: 'Heroj', 
      actor: 'Lee Thompson Young', 
      appearsIn: [5, 6, 9] 
    },
    { 
      id: 'bart', 
      name: 'Bart Allen', 
      role: 'Impulse / Najbrži čovjek', 
      group: 'Justice League', 
      origin: 'Čovek', 
      morality: 'Heroj', 
      actor: 'Kyle Gallner', 
      appearsIn: [4, 6, 8, 10] 
    },

    // Others
    { 
      id: 'kara', 
      name: 'Kara Kent', 
      role: 'Supergirl / Clarkova sestrična', 
      group: 'Kryptonians', 
      origin: 'Kriptonac', 
      morality: 'Heroj', 
      actor: 'Laura Vandervoort', 
      appearsIn: [7, 8, 10] 
    },
    { 
      id: 'zod', 
      name: 'General Zod', 
      role: 'Kriptonski vojni zapovjednik', 
      group: 'Kryptonians', 
      origin: 'Kriptonac', 
      morality: 'Negativac', 
      actor: 'Callum Blue', 
      appearsIn: [5, 6, 9, 10] 
    },
    { 
      id: 'brainiac', 
      name: 'Brainiac', 
      role: 'Umjetna inteligencija Kriptona', 
      group: 'Kryptonians', 
      origin: 'UI', 
      morality: 'Negativac', 
      actor: 'James Marsters', 
      appearsIn: [5, 7, 8] 
    },
    { 
      id: 'jor-el', 
      name: 'Jor-El', 
      role: 'Biološki otac (Svijest u Tvrđavi)', 
      group: 'Kryptonians', 
      origin: 'UI', 
      morality: 'Neutralan', 
      actor: 'Terence Stamp', 
      appearsIn: [2, 3, 4, 5, 6, 7, 8, 9, 10] 
    },
  ],
  links: [
    // Clark Core
    { source: 'clark', target: 'jonathan', type: 'Otac i sin', category: 'Obitelj', strength: 3, seasons: [1, 2, 3, 4, 5] },
    { source: 'clark', target: 'martha', type: 'Majka i sin', category: 'Obitelj', strength: 3, seasons: [1, 2, 3, 4, 5, 6, 9, 10] },
    { source: 'clark', target: 'chloe', type: 'Najbolji prijatelji i Watchtower', category: 'Prijateljstvo', strength: 3, seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { source: 'clark', target: 'lana', type: 'Bivša romantična veza', category: 'Prijateljstvo', strength: 2, seasons: [1, 2, 3, 4, 5, 6, 7] },
    { source: 'clark', target: 'lois', type: 'Prava ljubav / Brak', category: 'Obitelj', strength: 3, seasons: [4, 5, 6, 7, 8, 9, 10] },
    { source: 'clark', target: 'lex', type: 'Početno blisko prijateljstvo', category: 'Prijateljstvo', strength: 4, seasons: [1, 2, 3, 4] },
    { source: 'clark', target: 'lex', type: 'Vječni neprijatelji', category: 'Neprijateljstvo', strength: 4, seasons: [5, 6, 7, 10] },
    { source: 'clark', target: 'oliver', type: 'Saveznici i su-lideri Lige', category: 'Savez', strength: 2, seasons: [6, 7, 8, 9, 10] },
    { source: 'clark', target: 'kara', type: 'Sestrična i potpora', category: 'Obitelj', strength: 1, seasons: [7, 8, 10] },
    { source: 'clark', target: 'jor-el', type: 'Očinsko usmjeravanje', category: 'Obitelj', strength: 1, seasons: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { source: 'clark', target: 'pete', type: 'Čuvar tajne', category: 'Prijateljstvo', strength: 2, seasons: [1, 2, 3, 7] },
    { source: 'pete', target: 'jonathan', type: 'Povjerenje i zaštita', category: 'Prijateljstvo', strength: 1, seasons: [1, 2, 3] },
    { source: 'pete', target: 'martha', type: 'Povjerenje i zaštita', category: 'Prijateljstvo', strength: 1, seasons: [1, 2, 3] },

    // Kara Connections
    { source: 'kara', target: 'brainiac', type: 'Rivalstvo i sukob', category: 'Rivalstvo', strength: 1, seasons: [7] },
    { source: 'kara', target: 'martha', type: 'Obiteljsko povjerenje', category: 'Obitelj', strength: 1, seasons: [7, 10] },
    { source: 'kara', target: 'jonathan', type: 'Sjećanje / Poštovanje', category: 'Obitelj', strength: 1, seasons: [10] },

    // Jor-El Connections
    { source: 'jor-el', target: 'jonathan', type: 'Zavjet čuvanja Kal-Ela', category: 'Savez', strength: 1, seasons: [2, 3, 4, 5] },
    { source: 'jor-el', target: 'lionel', type: 'Kriptonski medij / Prorok', category: 'Savez', strength: 2, seasons: [5, 6, 7] },

    // Luthors
    { source: 'lex', target: 'lionel', type: 'Rivalstvo oca i sina', category: 'Rivalstvo', strength: 4, seasons: [1, 2, 3, 4, 5, 6, 7] },
    { source: 'lex', target: 'tess', type: 'Nasljednica Luthor dinastije', category: 'Savez', strength: 2, seasons: [8] },
    { source: 'lionel', target: 'tess', type: 'Biološki otac i kći', category: 'Obitelj', strength: 1, seasons: [10] },
    { source: 'lionel', target: 'martha', type: 'Političko prijateljstvo i interes', category: 'Prijateljstvo', strength: 1, seasons: [5, 6] },

    // Justice League Connections
    { source: 'oliver', target: 'chloe', type: 'Brak i partnerstvo', category: 'Obitelj', strength: 3, seasons: [9, 10] },
    { source: 'oliver', target: 'lois', type: 'Bivša ljubavna veza', category: 'Prijateljstvo', strength: 1, seasons: [6] },
    { source: 'oliver', target: 'ac', type: 'Suosnivači Lige Pravde', category: 'Savez', strength: 1, seasons: [6, 8, 10] },
    { source: 'oliver', target: 'victor', type: 'Regrutacija u Ligu', category: 'Savez', strength: 1, seasons: [6, 9] },
    { source: 'oliver', target: 'bart', type: 'Regrutacija i potpora', category: 'Savez', strength: 1, seasons: [4, 6, 8, 10] },

    // Enemies & Other
    { source: 'clark', target: 'zod', type: 'Arhineprijatelji', category: 'Neprijateljstvo', strength: 2, seasons: [5, 6, 9, 10] },
    { source: 'clark', target: 'brainiac', type: 'Strahoviti neprijatelj', category: 'Neprijateljstvo', strength: 2, seasons: [5, 7, 8] },
    { source: 'lana', target: 'brainiac', type: 'Infekcija i opsesivni nadzor', category: 'Neprijateljstvo', strength: 1, seasons: [7] },
    { source: 'lex', target: 'zod', type: 'Zodov ljudski domaćin', category: 'Neprijateljstvo', strength: 2, seasons: [5, 6] },
    { source: 'chloe', target: 'brainiac', type: 'Mentalna infekcija', category: 'Neprijateljstvo', strength: 1, seasons: [8] },
  ]
};
