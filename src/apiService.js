import mockDb from './mockDb'; // Import the  mock database

const API_LATENCY = 500; 

/**
 
 * will call this when a user attempts to log in.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: Object, message?: string}>}
 * A promise that resolves with success status and user data (if successful)
 * or rejects with a message (if unsuccessful).
 */
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockDb.users.find(u => u.email === email && u.password === password);
      if (user) {
        
        resolve({ success: true, user: { token: user.token, email: user.email } });
      } else {
        
        reject({ success: false, message: 'Invalid credentials' });
      }
    }, API_LATENCY);
  });
};

/**
 *  fetches all timesheets.
 * @param {string} token 
 * @returns {Promise<Array<Object>>} 
 */
export const getTimesheets = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (token) {
        resolve(mockDb.timesheets);
      } else {
        reject({ message: 'Authentication required' });
      }
    }, API_LATENCY);
  });
};

/**

 * @param {string} date
 * @param {string} token
 * @returns {Promise<Array<Object>>}
 * A promise that resolves with an array of entry objects for the given date
 */
export const getEntriesByDate = (date, token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token) {
        resolve(mockDb.entries[date] || []); // Return entries for the specific date
      } else {
        reject({ message: 'Authentication required to fetch timesheet entries.' });
      }
    }, API_LATENCY); 
  });
};

/**
 *  adds a new timesheet entry.
 * @param {Object} newEntry - The new entry object to add.
 * @param {string} token - An authentication token (currently mocked, not validated).
 * @returns {Promise<{success: boolean, message: string}>}
 * A promise that resolves with a success message or rejects with an error.
 */
export const addEntry = (newEntry, token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token) {
        return reject({ message: 'Authentication required to add entry.' });
      }

      const newDateKey = newEntry.date;

      if (!mockDb.entries[newDateKey]) {
        mockDb.entries[newDateKey] = []; 
      }
      mockDb.entries[newDateKey].push(newEntry);

      const existingTimesheetIndex = mockDb.timesheets.findIndex(sheet => sheet.date === newDateKey);

      if (existingTimesheetIndex !== -1) {
        mockDb.timesheets[existingTimesheetIndex].status = 'INCOMPLETE'; // Assuming new entry makes it incomplete
      } else {
        const newSheet = {
          week: mockDb.timesheets.length + 1, 
          date: newDateKey,
          status: 'INCOMPLETE',
          action: 'View', // Default action for new timesheets
        };
        mockDb.timesheets.push(newSheet);
      }

      resolve({ success: true, message: 'Entry added successfully!' });
    }, API_LATENCY); 
  });
};