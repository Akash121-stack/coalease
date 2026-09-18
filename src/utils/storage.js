// Central Storage Manager for Coal Intelligence Demo
import {
  DEMO_USERS,
  INITIAL_DOCUMENTS,
  INITIAL_ACTIVITIES,
  INITIAL_NOTIFICATIONS,
  MINES_DATA,
} from '../data/mockData';

const KEYS = {
  CURRENT_USER: 'coalintel_current_user',
  USERS: 'coalintel_users_registry',
  DOCUMENTS: 'coalintel_documents_v2',
  ACTIVITIES: 'coalintel_activities_v2',
  NOTIFICATIONS: 'coalintel_notifications_v2',
  MINES: 'coalintel_mines_v2',
  PREFERENCES: 'coalintel_preferences_v2',
};

// Safe JSON Parse helper
function safeGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

// Safe JSON Set helper
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Initialize seed data into localStorage if missing
export function initializeStorage() {
  if (!localStorage.getItem(KEYS.USERS)) {
    safeSet(KEYS.USERS, DEMO_USERS);
  }
  if (!localStorage.getItem(KEYS.DOCUMENTS)) {
    safeSet(KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  }
  if (!localStorage.getItem(KEYS.ACTIVITIES)) {
    safeSet(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    safeSet(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }
  if (!localStorage.getItem(KEYS.MINES)) {
    safeSet(KEYS.MINES, MINES_DATA);
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    // Default to Management demo user for smooth immediate demonstration
    safeSet(KEYS.CURRENT_USER, DEMO_USERS[0]);
  }
}

// Force full reset to pristine demo state
export function resetDemoData() {
  safeSet(KEYS.USERS, DEMO_USERS);
  safeSet(KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  safeSet(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  safeSet(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  safeSet(KEYS.MINES, MINES_DATA);
  safeSet(KEYS.CURRENT_USER, DEMO_USERS[0]);
  return true;
}

// -------------------------------------------------------------
// USER & AUTH METHODS
// -------------------------------------------------------------
export function getCurrentUser() {
  initializeStorage();
  return safeGet(KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user) {
  safeSet(KEYS.CURRENT_USER, user);
}

export function clearCurrentUser() {
  localStorage.removeItem(KEYS.CURRENT_USER);
}

export function getAllUsers() {
  initializeStorage();
  return safeGet(KEYS.USERS, DEMO_USERS);
}

export function registerUser(newUserData) {
  const users = getAllUsers();
  const existing = users.find(
    (u) => u.email.toLowerCase() === newUserData.email.toLowerCase()
  );

  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const initials = newUserData.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const userRecord = {
    id: `usr-${Date.now()}`,
    name: newUserData.name,
    email: newUserData.email,
    password: newUserData.password,
    role: newUserData.role || 'Geologist',
    department: newUserData.department || 'Geological Exploration Cell',
    avatar: initials || 'CI',
    phone: newUserData.phone || '+91 98000 00000',
    location: newUserData.location || 'Mine Operations Site',
    joinedDate: new Date().toISOString().split('T')[0],
  };

  users.push(userRecord);
  safeSet(KEYS.USERS, users);
  safeSet(KEYS.CURRENT_USER, userRecord);

  // Record audit activity
  addActivity({
    type: 'user_register',
    title: `New user account registered: ${userRecord.name} (${userRecord.role})`,
    user: userRecord.name,
    role: userRecord.role,
    category: 'System',
    icon: 'UserPlus',
  });

  return userRecord;
}

export function loginUser(email, password) {
  const users = getAllUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password. Please check your credentials.');
  }

  safeSet(KEYS.CURRENT_USER, user);

  // Record activity
  addActivity({
    type: 'user_login',
    title: `User logged in: ${user.name} (${user.role})`,
    user: user.name,
    role: user.role,
    category: 'System',
    icon: 'LogIn',
  });

  return user;
}

export function updateCurrentUser(updatedFields) {
  const current = getCurrentUser();
  if (!current) return null;

  const updated = { ...current, ...updatedFields };
  safeSet(KEYS.CURRENT_USER, updated);

  // Also update in all users list
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === current.id);
  if (idx !== -1) {
    users[idx] = updated;
    safeSet(KEYS.USERS, users);
  }

  return updated;
}

// -------------------------------------------------------------
// DOCUMENT METHODS
// -------------------------------------------------------------
export function getDocuments() {
  initializeStorage();
  return safeGet(KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
}

export function getDocumentById(id) {
  const docs = getDocuments();
  return docs.find((d) => d.id === id) || null;
}

export function updateDocument(id, updates) {
  const docs = getDocuments();
  const idx = docs.findIndex((d) => d.id === id);
  if (idx === -1) return null;

  const oldDoc = docs[idx];
  const updatedDoc = { ...oldDoc, ...updates };
  docs[idx] = updatedDoc;
  safeSet(KEYS.DOCUMENTS, docs);

  // Add audit activity
  if (updates.status && updates.status !== oldDoc.status) {
    const user = getCurrentUser();
    addActivity({
      type: 'verify',
      documentId: id,
      title: `Document ${id} status updated to "${updates.status}"`,
      user: user ? user.name : 'System Officer',
      role: user ? user.role : 'Management',
      category: updatedDoc.category,
      icon: updates.status === 'Verified' ? 'CheckCircle' : 'AlertTriangle',
    });
  }

  return updatedDoc;
}

export function addDocument(newDoc) {
  const docs = getDocuments();
  const user = getCurrentUser();

  const docRecord = {
    id: newDoc.id || `DOC-${Date.now().toString().slice(-6)}`,
    title: newDoc.title,
    category: newDoc.category || 'Geological',
    mine: newDoc.mine || 'Barkakana Block',
    year: parseInt(newDoc.year) || new Date().getFullYear(),
    status: newDoc.status || 'Pending',
    department: newDoc.department || (user ? user.department : 'General Operations'),
    type: newDoc.type || 'PDF',
    pages: newDoc.pages || Math.floor(Math.random() * 15) + 10,
    size: newDoc.size || '3.4 MB',
    date: new Date().toISOString().split('T')[0],
    uploadedBy: user ? user.name : 'System Operator',
    uploaderRole: user ? user.role : 'Field Worker',
    pdfUrl: newDoc.pdfUrl || '/documents/GEO-BK-142.pdf', // Fallback to real multi-page PDF
    keywords: newDoc.keywords || [newDoc.category.toLowerCase(), newDoc.mine.toLowerCase()],
    summary: newDoc.description || newDoc.summary || 'Uploaded technical report document.',
    extractedFindings: newDoc.extractedFindings || {
      geologicalConfidence: 'Pending Laboratory Assay',
      status: 'Indexed & Ready for Verification',
    },
  };

  docs.unshift(docRecord);
  safeSet(KEYS.DOCUMENTS, docs);

  // Record activity
  addActivity({
    type: 'upload',
    documentId: docRecord.id,
    title: `Document ${docRecord.id} ("${docRecord.title}") uploaded`,
    user: docRecord.uploadedBy,
    role: docRecord.uploaderRole,
    category: docRecord.category,
    icon: 'UploadCloud',
  });

  // Add notification
  addNotification({
    title: `New document ${docRecord.id} awaiting verification`,
    category: docRecord.category,
    link: `/documents/${docRecord.id}`,
    severity: 'info',
  });

  return docRecord;
}

// -------------------------------------------------------------
// ACTIVITIES / AUDIT LOG METHODS
// -------------------------------------------------------------
export function getActivities() {
  initializeStorage();
  return safeGet(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
}

export function addActivity({ type, documentId, title, user, role, category, icon }) {
  const activities = getActivities();
  const userObj = getCurrentUser();

  const newActivity = {
    id: `act-${Date.now()}`,
    type: type || 'general',
    documentId: documentId || null,
    title,
    user: user || (userObj ? userObj.name : 'System User'),
    role: role || (userObj ? userObj.role : 'Operator'),
    time: 'Just now',
    timestamp: new Date().toISOString(),
    category: category || 'General',
    icon: icon || 'Activity',
  };

  activities.unshift(newActivity);
  safeSet(KEYS.ACTIVITIES, activities.slice(0, 50)); // Keep last 50
  return newActivity;
}

// -------------------------------------------------------------
// NOTIFICATIONS METHODS
// -------------------------------------------------------------
export function getNotifications() {
  initializeStorage();
  return safeGet(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
}

export function addNotification({ title, category, link, severity = 'info' }) {
  const notifs = getNotifications();
  const newNotif = {
    id: `notif-${Date.now()}`,
    title,
    category: category || 'System',
    read: false,
    timestamp: 'Just now',
    link: link || '/notifications',
    severity,
  };
  notifs.unshift(newNotif);
  safeSet(KEYS.NOTIFICATIONS, notifs);
  return newNotif;
}

export function markNotificationRead(id) {
  const notifs = getNotifications();
  const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
  safeSet(KEYS.NOTIFICATIONS, updated);
  return updated;
}

export function markAllNotificationsRead() {
  const notifs = getNotifications();
  const updated = notifs.map((n) => ({ ...n, read: true }));
  safeSet(KEYS.NOTIFICATIONS, updated);
  return updated;
}

// -------------------------------------------------------------
// MINES DATA
// -------------------------------------------------------------
export function getMines() {
  initializeStorage();
  return safeGet(KEYS.MINES, MINES_DATA);
}

export function getMineById(id) {
  const mines = getMines();
  return mines.find((m) => m.id === id || m.name.toLowerCase() === id.toLowerCase()) || null;
}
