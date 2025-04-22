// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

// Mock data - replace with actual API calls in production
const mockMediaItems = [
  {
    id: "1",
    title: "Big Buck Bunny",
    type: "video",
    thumbnail: "/api/placeholder/320/180",
    duration: "9:56",
    size: "158 MB",
    addedOn: "2025-04-18T10:30:00Z",
    progress: 0.67,
    syncedDevices: ["Laptop", "Mobile"],
  },
  {
    id: "2",
    title: "Sintel - Blender Animation",
    type: "video",
    thumbnail: "/api/placeholder/320/180",
    duration: "14:48",
    size: "210 MB",
    addedOn: "2025-04-15T15:22:00Z",
    progress: 0.23,
    syncedDevices: ["Laptop", "Tablet", "TV"],
  },
  {
    id: "3",
    title: "Elephants Dream",
    type: "video",
    thumbnail: "/api/placeholder/320/180",
    duration: "10:53",
    size: "175 MB",
    addedOn: "2025-04-10T08:45:00Z",
    progress: 1,
    syncedDevices: ["Laptop"],
  },
  {
    id: "4",
    title: "Summer Vacation Photos",
    type: "image_collection",
    thumbnail: "/api/placeholder/320/180",
    count: "43 items",
    size: "86 MB",
    addedOn: "2025-04-05T12:10:00Z",
    syncedDevices: ["Mobile", "Laptop"],
  },
  {
    id: "5",
    title: "Audio Book - The Great Adventure",
    type: "audio",
    thumbnail: "/api/placeholder/320/180",
    duration: "2:34:15",
    size: "56 MB",
    addedOn: "2025-04-01T17:30:00Z",
    progress: 0.48,
    syncedDevices: ["Mobile"],
  },
];

const mockDevices = [
  {
    id: "1",
    name: "Laptop",
    type: "laptop",
    lastActive: "2025-04-22T08:30:00Z",
    storage: { used: 1.2, total: 8 },
  },
  {
    id: "2",
    name: "Mobile",
    type: "smartphone",
    lastActive: "2025-04-21T20:15:00Z",
    storage: { used: 0.8, total: 4 },
  },
  {
    id: "3",
    name: "Tablet",
    type: "tablet",
    lastActive: "2025-04-20T14:45:00Z",
    storage: { used: 1.5, total: 6 },
  },
  {
    id: "4",
    name: "TV",
    type: "tv",
    lastActive: "2025-04-19T19:20:00Z",
    storage: { used: 0.3, total: 2 },
  },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/api/placeholder/40/40",
    plan: "Premium",
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Replace with actual logout logic
  };

  const filteredMedia = mockMediaItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get recently active media (would be from API)
  const recentMedia = [...mockMediaItems]
    .sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
    .slice(0, 3);

  // Get continue watching items (with progress < 1)
  const continueWatching = mockMediaItems.filter(
    (item) => item.progress !== undefined && item.progress < 1
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar/Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="logo">SyncStream</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === "recent" ? "active" : ""}>
              <button onClick={() => setActiveTab("recent")}>
                <span className="icon">📋</span>
                <span>Recently Added</span>
              </button>
            </li>
            <li className={activeTab === "library" ? "active" : ""}>
              <button onClick={() => setActiveTab("library")}>
                <span className="icon">🎬</span>
                <span>My Library</span>
              </button>
            </li>
            <li className={activeTab === "devices" ? "active" : ""}>
              <button onClick={() => setActiveTab("devices")}>
                <span className="icon">📱</span>
                <span>My Devices</span>
              </button>
            </li>
            <li className={activeTab === "settings" ? "active" : ""}>
              <button onClick={() => setActiveTab("settings")}>
                <span className="icon">⚙️</span>
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <img src={user.avatar} alt="Profile" className="user-avatar" />
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-plan">{user.plan}</div>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <span className="icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Header with search */}
        <header className="main-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search your media..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="header-actions">
            <button className="upload-button" onClick={handleUpload}>
              <span className="icon">⬆️</span>
              <span>Upload Media</span>
            </button>
          </div>
        </header>

        {/* Content based on active tab */}
        <div className="main-content">
          {isLoading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading your media...</p>
            </div>
          ) : (
            <>
              {activeTab === "recent" && (
                <div className="tab-content">
                  {/* Continue Watching Section */}
                  <section className="content-section">
                    <div className="section-header">
                      <h2>Continue Watching</h2>
                    </div>

                    <div className="media-row">
                      {continueWatching.length > 0 ? (
                        continueWatching.map((item) => (
                          <div key={item.id} className="media-card continuing">
                            <div className="media-thumbnail">
                              <img src={item.thumbnail} alt={item.title} />
                              <div className="progress-bar">
                                <div
                                  className="progress"
                                  style={{ width: `${item.progress * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="media-info">
                              <h3>{item.title}</h3>
                              <div className="media-meta">
                                <span>{item.duration}</span>
                                <span className="separator">•</span>
                                <span>
                                  {item.type === "video"
                                    ? "Video"
                                    : item.type === "audio"
                                    ? "Audio"
                                    : "Images"}
                                </span>
                              </div>
                            </div>
                            <div className="media-actions">
                              <button className="action-button play">
                                ▶️ Play
                              </button>
                              <div className="synced-devices">
                                <span>Synced: </span>
                                {item.syncedDevices.map((device, idx) => (
                                  <span key={idx} className="device-pill">
                                    {device}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="empty-state">
                          <p>No media in progress. Start watching something!</p>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Recently Added Section */}
                  <section className="content-section">
                    <div className="section-header">
                      <h2>Recently Added</h2>
                      <Link to="/library" className="view-all">
                        View All
                      </Link>
                    </div>

                    <div className="media-row">
                      {recentMedia.map((item) => (
                        <div key={item.id} className="media-card">
                          <div className="media-thumbnail">
                            <img src={item.thumbnail} alt={item.title} />
                            {item.progress !== undefined &&
                              item.progress > 0 &&
                              item.progress < 1 && (
                                <div className="progress-bar">
                                  <div
                                    className="progress"
                                    style={{ width: `${item.progress * 100}%` }}
                                  ></div>
                                </div>
                              )}
                          </div>
                          <div className="media-info">
                            <h3>{item.title}</h3>
                            <div className="media-meta">
                              <span>
                                {item.type === "video" || item.type === "audio"
                                  ? item.duration
                                  : item.count}
                              </span>
                              <span className="separator">•</span>
                              <span>{formatDate(item.addedOn)}</span>
                            </div>
                          </div>
                          <div className="media-actions">
                            <button className="action-button play">
                              {item.type === "image_collection"
                                ? "👁️ View"
                                : "▶️ Play"}
                            </button>
                            <button className="action-button sync">
                              🔄 Sync
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "library" && (
                <div className="tab-content">
                  <div className="section-header with-filters">
                    <h2>My Library</h2>

                    <div className="filter-options">
                      <div className="type-filters">
                        <button
                          className={filterType === "all" ? "active" : ""}
                          onClick={() => setFilterType("all")}
                        >
                          All
                        </button>
                        <button
                          className={filterType === "video" ? "active" : ""}
                          onClick={() => setFilterType("video")}
                        >
                          Videos
                        </button>
                        <button
                          className={filterType === "audio" ? "active" : ""}
                          onClick={() => setFilterType("audio")}
                        >
                          Audio
                        </button>
                        <button
                          className={
                            filterType === "image_collection" ? "active" : ""
                          }
                          onClick={() => setFilterType("image_collection")}
                        >
                          Images
                        </button>
                      </div>

                      <div className="view-mode">
                        <button
                          className={viewMode === "grid" ? "active" : ""}
                          onClick={() => setViewMode("grid")}
                        >
                          Grid
                        </button>
                        <button
                          className={viewMode === "list" ? "active" : ""}
                          onClick={() => setViewMode("list")}
                        >
                          List
                        </button>
                      </div>
                    </div>
                  </div>

                  {filteredMedia.length > 0 ? (
                    <div className={`media-${viewMode}`}>
                      {filteredMedia.map((item) => (
                        <div
                          key={item.id}
                          className={`media-${
                            viewMode === "grid" ? "card" : "row"
                          }`}
                        >
                          <div className="media-thumbnail">
                            <img src={item.thumbnail} alt={item.title} />
                            {item.progress !== undefined &&
                              item.progress > 0 &&
                              item.progress < 1 && (
                                <div className="progress-bar">
                                  <div
                                    className="progress"
                                    style={{ width: `${item.progress * 100}%` }}
                                  ></div>
                                </div>
                              )}
                          </div>
                          <div className="media-info">
                            <h3>{item.title}</h3>
                            <div className="media-meta">
                              {viewMode === "list" && (
                                <>
                                  <span>
                                    {item.type === "video"
                                      ? "🎬"
                                      : item.type === "audio"
                                      ? "🔊"
                                      : "📷"}
                                  </span>
                                  <span className="separator">•</span>
                                </>
                              )}
                              <span>
                                {item.type === "video" || item.type === "audio"
                                  ? item.duration
                                  : item.count}
                              </span>
                              <span className="separator">•</span>
                              <span>{item.size}</span>
                              {viewMode === "list" && (
                                <>
                                  <span className="separator">•</span>
                                  <span>Added: {formatDate(item.addedOn)}</span>
                                </>
                              )}
                            </div>
                            {viewMode === "list" && (
                              <div className="device-sync-list">
                                <span>Synced to: </span>
                                {item.syncedDevices.map((device, idx) => (
                                  <span key={idx} className="device-pill">
                                    {device}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="media-actions">
                            <button className="action-button play">
                              {item.type === "image_collection"
                                ? "👁️ View"
                                : "▶️ Play"}
                            </button>
                            {viewMode === "grid" && (
                              <button className="action-button sync">
                                🔄 Sync
                              </button>
                            )}
                            {viewMode === "list" && (
                              <>
                                <button className="action-button sync">
                                  🔄 Sync
                                </button>
                                <button className="action-button download">
                                  ⬇️ Download
                                </button>
                                <button className="action-button delete">
                                  🗑️ Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No media found matching your filters.</p>
                      <button
                        className="action-button"
                        onClick={() => setFilterType("all")}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "devices" && (
                <div className="tab-content">
                  <div className="section-header">
                    <h2>My Devices</h2>
                    <button className="action-button">+ Add Device</button>
                  </div>

                  <div className="devices-grid">
                    {mockDevices.map((device) => (
                      <div key={device.id} className="device-card">
                        <div className="device-icon">
                          {device.type === "laptop"
                            ? "💻"
                            : device.type === "smartphone"
                            ? "📱"
                            : device.type === "tablet"
                            ? "📟"
                            : "📺"}
                        </div>
                        <div className="device-info">
                          <h3>{device.name}</h3>
                          <div className="device-meta">
                            <p>
                              Last active: {formatDate(device.lastActive)} at{" "}
                              {formatTime(device.lastActive)}
                            </p>
                            <div className="storage-bar">
                              <div
                                className="storage-used"
                                style={{
                                  width: `${
                                    (device.storage.used /
                                      device.storage.total) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <p>
                              Storage: {device.storage.used} GB used of{" "}
                              {device.storage.total} GB
                            </p>
                          </div>
                        </div>
                        <div className="device-actions">
                          <button className="action-button sync">
                            Sync Now
                          </button>
                          <button className="action-button settings">
                            Settings
                          </button>
                          <button className="action-button remove">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="device-card add-device">
                      <div className="add-device-content">
                        <div className="add-icon">+</div>
                        <h3>Add New Device</h3>
                        <p>Sync your content to another device</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="tab-content">
                  <div className="section-header">
                    <h2>Settings</h2>
                  </div>

                  <div className="settings-grid">
                    <div className="settings-card">
                      <h3>Account Settings</h3>
                      <form className="settings-form">
                        <div className="form-group">
                          <label>Name</label>
                          <input type="text" value={user.name} readOnly />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input type="email" value={user.email} readOnly />
                        </div>
                        <div className="form-group">
                          <label>Current Plan</label>
                          <div className="plan-info">
                            <span className="plan-badge">{user.plan}</span>
                            <button className="action-button">
                              Upgrade Plan
                            </button>
                          </div>
                        </div>
                        <button type="button" className="settings-button">
                          Edit Profile
                        </button>
                        <button
                          type="button"
                          className="settings-button danger"
                        >
                          Change Password
                        </button>
                      </form>
                    </div>

                    <div className="settings-card">
                      <h3>Sync Settings</h3>
                      <form className="settings-form">
                        <div className="form-group">
                          <label>Sync Frequency</label>
                          <select defaultValue="auto">
                            <option value="auto">Automatic</option>
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="manual">Manual Only</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Auto-Download</label>
                          <div className="toggle-group">
                            <label className="toggle">
                              <input type="checkbox" defaultChecked />
                              <span className="toggle-slider"></span>
                            </label>
                            <span>
                              Automatically download new media on Wi-Fi
                            </span>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Quality Settings</label>
                          <select defaultValue="auto">
                            <option value="auto">
                              Auto (Based on Network)
                            </option>
                            <option value="high">High Quality Always</option>
                            <option value="medium">Medium Quality</option>
                            <option value="low">Low Quality (Save Data)</option>
                          </select>
                        </div>
                        <button type="button" className="settings-button">
                          Save Changes
                        </button>
                      </form>
                    </div>

                    <div className="settings-card">
                      <h3>Storage Management</h3>
                      <div className="storage-overview">
                        <div className="storage-progress">
                          <svg viewBox="0 0 100 100" className="storage-circle">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              className="storage-circle-bg"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              className="storage-circle-fill"
                              style={{ strokeDashoffset: 85 }}
                            />
                          </svg>
                          <div className="storage-text">
                            <span className="storage-percent">65%</span>
                            <span className="storage-label">Used</span>
                          </div>
                        </div>
                        <div className="storage-details">
                          <div className="storage-detail">
                            <span className="detail-label">Used Space:</span>
                            <span className="detail-value">6.5 GB</span>
                          </div>
                          <div className="storage-detail">
                            <span className="detail-label">Free Space:</span>
                            <span className="detail-value">3.5 GB</span>
                          </div>
                          <div className="storage-detail">
                            <span className="detail-label">Total Space:</span>
                            <span className="detail-value">10 GB</span>
                          </div>
                        </div>
                      </div>
                      <div className="storage-actions">
                        <button className="settings-button">
                          Clean Up Space
                        </button>
                        <button className="settings-button">
                          Upgrade Storage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload Media</h2>
              <button
                className="close-modal"
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="upload-area">
                <div className="upload-dropzone">
                  <span className="upload-icon">⬆️</span>
                  <p>Drag and drop files here, or click to browse</p>
                  <input type="file" className="file-input" multiple />
                </div>
                <div className="upload-instructions">
                  <h4>Supported formats:</h4>
                  <ul>
                    <li>Video: MP4, MKV, AVI, MOV (max 5GB)</li>
                    <li>Audio: MP3, WAV, FLAC, AAC (max 500MB)</li>
                    <li>Images: JPG, PNG, GIF, WEBP (max 50MB)</li>
                  </ul>
                </div>
              </div>
              <div className="upload-options">
                <h4>Upload Options</h4>
                <div className="option-group">
                  <label className="option">
                    <input type="checkbox" defaultChecked />
                    <span>Sync to all my devices after upload</span>
                  </label>
                </div>
                <div className="option-group">
                  <label className="option">
                    <input type="checkbox" defaultChecked />
                    <span>Optimize for streaming</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button className="upload-button">Upload Files</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
