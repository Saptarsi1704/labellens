import { useState, useRef, useCallback } from "react";

const GOOGLE_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
`;

const styles = `
  ${GOOGLE_FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0f0e;
    --surface: #161a17;
    --surface2: #1e2420;
    --border: #2a3030;
    --accent: #a8e063;
    --accent2: #56ab2f;
    --warn: #f7b731;
    --danger: #ee5a24;
    --text: #e8ede9;
    --muted: #7a8c7e;
    --radius: 16px;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app {
    min-height: 100vh;
    background: var(--bg);
    background-image: radial-gradient(ellipse at 20% 10%, #1a2e1a 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, #0a1f15 0%, transparent 50%);
    padding: 0 16px 60px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0 36px;
    max-width: 720px;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-icon {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 22px;
    letter-spacing: -0.5px;
    color: var(--text);
  }

  .logo-text span { color: var(--accent); }

  .badge {
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--muted);
    font-size: 11px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .hero {
    max-width: 720px;
    margin: 0 auto 40px;
    text-align: center;
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 6vw, 52px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1.5px;
    margin-bottom: 16px;
  }

  .hero h1 em {
    font-style: normal;
    color: var(--accent);
    display: block;
  }

  .hero p {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto;
    font-weight: 300;
  }

  .main { max-width: 720px; margin: 0 auto; }

  /* Upload zone */
  .upload-zone {
    border: 2px dashed var(--border);
    border-radius: var(--radius);
    padding: 48px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background: var(--surface);
    position: relative;
    overflow: hidden;
  }

  .upload-zone::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(168,224,99,0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .upload-zone:hover, .upload-zone.drag-over {
    border-color: var(--accent);
    background: #1a2218;
  }

  .upload-icon {
    width: 64px; height: 64px;
    background: var(--surface2);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin: 0 auto 16px;
    border: 1px solid var(--border);
  }

  .upload-zone h3 {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .upload-zone p { color: var(--muted); font-size: 14px; }

  .upload-zone p span {
    color: var(--accent);
    text-decoration: underline;
    cursor: pointer;
  }

  /* Preview */
  .preview-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 20px;
  }

  .preview-img {
    width: 100%; max-height: 280px;
    object-fit: contain;
    background: #0a0c0b;
    display: block;
  }

  .preview-footer {
    padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--border);
  }

  .preview-name { font-size: 13px; color: var(--muted); }

  .btn-ghost {
    background: none; border: 1px solid var(--border);
    color: var(--muted); padding: 6px 14px;
    border-radius: 8px; font-size: 12px; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .btn-ghost:hover { border-color: var(--danger); color: var(--danger); }

  /* CTA button */
  .btn-analyze {
    width: 100%;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    color: #0a1f0a;
    border: none;
    padding: 18px 24px;
    border-radius: var(--radius);
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 24px rgba(86,171,47,0.25);
    margin-bottom: 32px;
  }

  .btn-analyze:hover { transform: translateY(-1px); box-shadow: 0 6px 32px rgba(86,171,47,0.35); }
  .btn-analyze:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* Loading */
  .loading-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 40px;
    text-align: center;
  }

  .spinner {
    width: 40px; height: 40px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-card p { color: var(--muted); font-size: 14px; }
  .loading-card strong { display: block; font-family: 'Syne', sans-serif; font-size: 18px; margin-bottom: 8px; color: var(--text); }

  /* Results */
  .results { animation: fadeUp 0.4s ease both; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: none; } }

  .result-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
  }

  .result-header h2 {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 800;
    letter-spacing: -0.5px;
  }

  .score-pill {
    padding: 6px 16px;
    border-radius: 20px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  .score-green { background: rgba(168,224,99,0.12); color: var(--accent); border: 1px solid rgba(168,224,99,0.25); }
  .score-yellow { background: rgba(247,183,49,0.12); color: var(--warn); border: 1px solid rgba(247,183,49,0.25); }
  .score-red { background: rgba(238,90,36,0.12); color: var(--danger); border: 1px solid rgba(238,90,36,0.25); }

  /* Summary box */
  .summary-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-bottom: 20px;
    line-height: 1.7;
    font-size: 15px;
    color: #c8d8ca;
  }

  /* Ingredient cards */
  .section-label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
    margin-top: 28px;
  }

  .ingredients-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
  }

  .ingredient-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: border-color 0.15s;
  }

  .ingredient-card:hover { border-color: #3a4a3e; }

  .ing-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    margin-top: 5px;
    flex-shrink: 0;
  }
  .dot-green { background: var(--accent); box-shadow: 0 0 6px rgba(168,224,99,0.5); }
  .dot-yellow { background: var(--warn); box-shadow: 0 0 6px rgba(247,183,49,0.5); }
  .dot-red { background: var(--danger); box-shadow: 0 0 6px rgba(238,90,36,0.5); }

  .ing-content { flex: 1; }
  .ing-name {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .ing-also { font-size: 12px; color: var(--muted); margin-bottom: 4px; font-style: italic; }
  .ing-desc { font-size: 13px; color: #9aaa9c; line-height: 1.5; }

  .ing-tag {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 6px;
    letter-spacing: 0.3px;
    align-self: flex-start;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .tag-safe { background: rgba(168,224,99,0.1); color: var(--accent); }
  .tag-caution { background: rgba(247,183,49,0.1); color: var(--warn); }
  .tag-avoid { background: rgba(238,90,36,0.1); color: var(--danger); }

  /* Overall verdict */
  .verdict-card {
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid;
  }
  .verdict-green { background: rgba(168,224,99,0.05); border-color: rgba(168,224,99,0.2); }
  .verdict-yellow { background: rgba(247,183,49,0.05); border-color: rgba(247,183,49,0.2); }
  .verdict-red { background: rgba(238,90,36,0.05); border-color: rgba(238,90,36,0.2); }

  .verdict-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 16px; font-weight: 700;
    margin-bottom: 8px;
  }
  .verdict-card p { font-size: 14px; color: #9aaa9c; line-height: 1.6; }

  /* Reset */
  .btn-reset {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--muted);
    padding: 14px;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.15s;
    margin-top: 8px;
  }
  .btn-reset:hover { border-color: var(--accent); color: var(--accent); }

  /* coming soon */
  .coming-soon {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-top: 40px;
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .coming-soon-icon { font-size: 28px; flex-shrink: 0; }
  .coming-soon h4 {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .coming-soon p { font-size: 12px; color: var(--muted); line-height: 1.5; }

  .error-box {
    background: rgba(238,90,36,0.07);
    border: 1px solid rgba(238,90,36,0.25);
    border-radius: var(--radius);
    padding: 20px 24px;
    color: #f0a090;
    font-size: 14px;
    line-height: 1.6;
  }

  input[type="file"] { display: none; }
`;

function getRatingColor(rating) {
  if (!rating) return "yellow";
  const r = rating.toLowerCase();
  if (r.includes("safe") || r.includes("good") || r.includes("natural")) return "green";
  if (r.includes("avoid") || r.includes("harmful") || r.includes("bad") || r.includes("danger")) return "red";
  return "yellow";
}

function ScorePill({ score }) {
  const s = (score || "").toLowerCase();
  let cls = "score-yellow", label = score;
  if (s.includes("good") || s.includes("healthy") || s.includes("great")) cls = "score-green";
  else if (s.includes("poor") || s.includes("bad") || s.includes("avoid")) cls = "score-red";
  return <span className={`score-pill ${cls}`}>{label || "—"}</span>;
}

function IngredientCard({ ing }) {
  const color = getRatingColor(ing.rating);
  return (
    <div className="ingredient-card">
      <div className={`ing-dot dot-${color}`} />
      <div className="ing-content">
        <div className="ing-name">{ing.name}</div>
        {ing.aliases && <div className="ing-also">Also known as: {ing.aliases}</div>}
        <div className="ing-desc">{ing.description}</div>
      </div>
      <span className={`ing-tag tag-${color === "green" ? "safe" : color === "red" ? "avoid" : "caution"}`}>
        {color === "green" ? "Safe" : color === "red" ? "Avoid" : "Caution"}
      </span>
    </div>
  );
}

export default function App() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
    setResult(null);
    setError(null);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const analyze = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = rej;
        r.readAsDataURL(imageFile);
      });

      // Normalize media type to supported values only
      let mediaType = imageFile.type;
      if (mediaType === "image/jpg") mediaType = "image/jpeg";
      if (!["image/jpeg","image/png","image/gif","image/webp"].includes(mediaType)) {
        mediaType = "image/jpeg";
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: { type: "base64", media_type: mediaType, data: base64 }
                },
                {
                  type: "text",
                  text: `You are a food ingredient expert. Analyze the ingredients list visible in this food label image.

Respond with ONLY a raw JSON object — no markdown, no backticks, no explanation text before or after. Use exactly this structure:
{
  "productName": "name or null",
  "overallScore": "Healthy or Moderate or Poor",
  "summary": "2-3 sentence plain-English summary of this product",
  "verdict": "one sentence overall verdict",
  "verdictLevel": "green or yellow or red",
  "ingredients": [
    {
      "name": "common name",
      "aliases": "other label names, or null",
      "description": "what it is, its purpose in food, any health concerns",
      "rating": "Safe or Caution or Avoid"
    }
  ]
}

Decode all chemical/scientific names into plain English. If ingredients are not visible, still return the JSON with an empty ingredients array and explain in the summary.`
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`API error ${response.status}: ${errData?.error?.message || response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "API returned an error");
      }

      const text = data.content?.map(b => b.text || "").join("").trim() || "";
      if (!text) throw new Error("Empty response from API");

      const clean = text.replace(/```json|```/g, "").trim();

      // find the JSON object even if there's extra text
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response: " + text.slice(0, 100));

      const parsed = JSON.parse(jsonMatch[0]);
      setResult(parsed);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Unknown error. Check browser console for details.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setImageFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header>
          <div className="logo">
            <div className="logo-icon">🔬</div>
            <div className="logo-text">Label<span>Lens</span></div>
          </div>
          <div className="badge">Beta</div>
        </header>

        <div className="hero">
          <h1>Know what you're <em>actually eating.</em></h1>
          <p>Snap a photo of any food label and get a plain-English breakdown of every ingredient — no chemistry degree needed.</p>
        </div>

        <div className="main">
          {!image ? (
            <div
              className={`upload-zone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <div className="upload-icon">📷</div>
              <h3>Upload your food label</h3>
              <p>Drag & drop or <span>browse files</span></p>
              <p style={{ marginTop: 8, fontSize: 12 }}>JPG, PNG, WEBP supported</p>
              <input ref={fileRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <>
              <div className="preview-card">
                <img src={image} alt="Label preview" className="preview-img" />
                <div className="preview-footer">
                  <span className="preview-name">{imageFile?.name}</span>
                  <button className="btn-ghost" onClick={reset}>Remove</button>
                </div>
              </div>

              {!result && !loading && (
                <button className="btn-analyze" onClick={analyze}>
                  🔍 Analyze Ingredients
                </button>
              )}
            </>
          )}

          {loading && (
            <div className="loading-card">
              <div className="spinner" />
              <strong>Analyzing your label…</strong>
              <p>Decoding ingredients and looking up health info</p>
            </div>
          )}

          {error && (
            <div className="error-box">⚠️ {error}</div>
          )}

          {result && (
            <div className="results">
              <div className="result-header">
                <h2>{result.productName || "Label Analysis"}</h2>
                <ScorePill score={result.overallScore} />
              </div>

              <div className="summary-box">{result.summary}</div>

              <div className={`verdict-card verdict-${result.verdictLevel || "yellow"}`}>
                <h3>Verdict</h3>
                <p>{result.verdict}</p>
              </div>

              <div className="section-label">Ingredient Breakdown</div>
              <div className="ingredients-grid">
                {(result.ingredients || []).map((ing, i) => (
                  <IngredientCard key={i} ing={ing} />
                ))}
              </div>

              <button className="btn-reset" onClick={reset}>← Analyze another label</button>
            </div>
          )}

          <div className="coming-soon">
            <div className="coming-soon-icon">🚀</div>
            <div>
              <h4>More features coming soon</h4>
              <p>Personalized diet tracking, exercise plans, allergen alerts, and nutritional scoring — once we grow the community.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
