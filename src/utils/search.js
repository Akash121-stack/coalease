// Full-text & Multi-field search utility for Coal Intelligence documents

export function searchDocuments(documents, filters) {
  if (!documents || !Array.isArray(documents)) return [];

  const {
    keyword = '',
    category = 'All',
    mine = 'All',
    year = 'All',
    department = 'All',
    status = 'All',
    docType = 'All',
    sortBy = 'date-desc',
  } = filters || {};

  const cleanKeyword = keyword.trim().toLowerCase();

  const filtered = documents.filter((doc) => {
    // 1. Keyword match across title, description/summary, mine, category, department, keywords array, and ID
    if (cleanKeyword) {
      const matchId = doc.id.toLowerCase().includes(cleanKeyword);
      const matchTitle = doc.title.toLowerCase().includes(cleanKeyword);
      const matchSummary = (doc.summary || '').toLowerCase().includes(cleanKeyword);
      const matchMine = doc.mine.toLowerCase().includes(cleanKeyword);
      const matchCategory = doc.category.toLowerCase().includes(cleanKeyword);
      const matchDept = (doc.department || '').toLowerCase().includes(cleanKeyword);
      const matchKeywords = (doc.keywords || []).some((k) =>
        k.toLowerCase().includes(cleanKeyword)
      );
      const matchExtracted = doc.extractedFindings
        ? Object.values(doc.extractedFindings).some((v) =>
            String(v).toLowerCase().includes(cleanKeyword)
          )
        : false;

      if (
        !matchId &&
        !matchTitle &&
        !matchSummary &&
        !matchMine &&
        !matchCategory &&
        !matchDept &&
        !matchKeywords &&
        !matchExtracted
      ) {
        return false;
      }
    }

    // 2. Category Filter
    if (category && category !== 'All' && doc.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 3. Mine Filter
    if (mine && mine !== 'All' && doc.mine.toLowerCase() !== mine.toLowerCase()) {
      return false;
    }

    // 4. Year Filter
    if (year && year !== 'All' && String(doc.year) !== String(year)) {
      return false;
    }

    // 5. Department Filter
    if (
      department &&
      department !== 'All' &&
      doc.department.toLowerCase() !== department.toLowerCase()
    ) {
      return false;
    }

    // 6. Status Filter
    if (status && status !== 'All' && doc.status.toLowerCase() !== status.toLowerCase()) {
      return false;
    }

    // 7. Document Type Filter
    if (docType && docType !== 'All' && doc.type.toLowerCase() !== docType.toLowerCase()) {
      return false;
    }

    return true;
  });

  // Sorting
  return filtered.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'pages-desc':
        return (b.pages || 0) - (a.pages || 0);
      case 'pages-asc':
        return (a.pages || 0) - (b.pages || 0);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });
}
