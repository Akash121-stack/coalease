# COAL INTELLIGENCE
### Digital Knowledge & Information Management System for Coal Mining & Geological Data

**Coal Intelligence** is a complete, centralized digital knowledge platform for mining and geological information designed for Management, Geologists, Mining Engineers, and Field Workers.

---

## 🚀 Live Development Server

The application is currently running at:
- **Local URL**: [http://localhost:5173/](http://localhost:5173/)
- **Network URL**: `http://192.168.1.10:5173/`

To start the server manually at any time:
```bash
npm run dev
```

To create a production build:
```bash
npm run build
```

---

## 🔑 Quick Demo Logins

Use any of these 1-click demo accounts on the `/login` screen:

| Role | Demo Email | Demo Password | Specific Workspace Features |
| :--- | :--- | :--- | :--- |
| **Management** | `management@coalintel.demo` | `demo123` | Executive KPI overview, 74 MT targets, dispatch reconciliations |
| **Geologist** | `geologist@coalintel.demo` | `demo123` | Stratigraphy data, 318 borehole logs, UNFC reserve categorization |
| **Mining Engineer** | `engineer@coalintel.demo` | `demo123` | Opencast bench geometry, HEMM fleet metrics, slope radar stability |
| **Field Worker** | `field@coalintel.demo` | `demo123` | Core recovery logs, field submissions, drilling status |

---

## 📁 Key Features & Capabilities

1. **Dashboard** (`/dashboard`)
   - Role-adaptive KPI statistics (Management, Geologist, Mining Engineer, Field Worker).
   - Interactive 5-Year Recharts area chart showing Coal Production vs Dispatch (2020–2025).
   - Document category distribution & data quality verification health indicators.
   - Clickable recent activity items that jump directly to associated records.
   - Recently updated documents with 1-click PDF view.

2. **Manual & AI Search** (`/search`)
   - Dual search launcher: **Manual Repository Search** vs **Ask AI Assistant** (links to external companion AI).
   - Multi-field filtering by **Keyword**, **Category**, **Mine/Block**, **Year**, **Department**, and **Status**.
   - Grid and Table view toggling with instant sorting.

3. **Central Data Repository** (`/repository`)
   - Filter tabs: *All*, *Geological*, *Mining*, *Production*, *Historical*.
   - Instant search and sorting by date, title, and page count.

4. **Document Viewer & Real Multi-Page PDFs** (`/documents/:id`)
   - Embedded native PDF viewer displaying genuine **20–25 page technical PDF reports** from `/documents/`.
   - Fullscreen mode, zoom controls, and direct download.
   - Extracted Technical Parameters panel (borehole depth, coal horizons, seam thickness, proximate assays, stripping ratios).
   - Digital verification status toggle.

5. **Upload & Ingestion Pipeline** (`/upload`)
   - Drag-and-drop browser File API selector.
   - Simulated 4-step pipeline animation: `Submitted → Indexed → Verified → Available`.
   - Instant storage in localStorage and inclusion into repository catalog.

6. **Verification Center** (`/verification`)
   - Queue of records awaiting statutory engineering review.
   - Interactive verification & rejection modal with audit notes.

7. **Mining Analytics Suite** (`/analytics`)
   - 5-Year Production vs Dispatch trend charts.
   - Monthly production seasonality (Apr–Mar).
   - Mine-wise production contribution breakdown.
   - Overburden (OB) removal vs stripping ratio tracking.
   - 5-Year digital repository growth trajectory.

8. **Enterprise Report Builder** (`/reports`)
   - Template selection: *Production Summary*, *Geological Overview*, *Mine Performance*.
   - Dynamic parameter selection (Mine, Year, Classification).
   - Formatted printable document preview with `window.print()` and CSV export.

9. **Mine Explorer** (`/mines`)
   - In-depth exploration of 4 principal mining blocks: *Barkakana Block*, *North Karanpura*, *Singrauli Block*, and *Central West Mine*.
   - Drill core tables, active HEMM equipment inventories, and linked repository records.

10. **Knowledge Trends** (`/trends`)
    - Visual frequency bars for key mining topics (*Production*, *Borehole*, *Exploration*, *Geology*, *Coal Reserve*, *Stripping Ratio*, etc.).
    - 1-click topic jump to pre-filtered search results.

11. **System Audit History** (`/history`)
    - Chronological event timeline tracking uploads, certifications, edits, and report generations.

12. **Notifications & Profile Settings** (`/notifications`, `/profile`)
    - Unread alert center with mark-as-read controls.
    - Role privilege switcher and demo factory reset tool.

---

## 🏗️ Technology Architecture
- **React 19** + **Vite 8**
- **React Router 7**
- **Recharts** for industrial analytics
- **Lucide React** for enterprise iconography
- **Pure LocalStorage Persistence** (`src/utils/storage.js`)
- **Native PDF 1.4 Multi-Page Engine** (`scripts/create-documents.js` generating files to `public/documents/`)
