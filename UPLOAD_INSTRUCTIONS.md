# Fansarr GitHub Upload Instructions

## Option 1: Proper GitHub Fork (Recommended)

1. **Go to the original Stasharr repository**: https://github.com/enymawse/stasharr
2. **Click the "Fork" button** in the top-right
3. **Rename your fork** to `fansarr` (you can do this in Settings → Repository name)
4. **Clone your fork locally**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fansarr.git
   cd fansarr
   ```
5. **Apply our changes** to this proper fork using the commits from this project

## Option 2: Manual Repository with Attribution

If you prefer a separate repo:

1. **Create new repository**: https://github.com/new → name: `fansarr`
2. **Update the remote URL:**

3. **Update the remote URL:**

   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/fansarr.git
   ```

4. **Push to GitHub:**

   ```bash
   git push -u origin main
   ```

5. **Update repository URLs in code:**
   Replace `YOUR_USERNAME` in these files with your actual GitHub username:
   - `package.json` line 18
   - `metadata.js` lines 8, 9, 10, 11

6. **Commit and push the URL updates:**
   ```bash
   git add .
   git commit -m "docs: update repository URLs with actual username"
   git push origin main
   ```

## Files to Update

### package.json (line ~18)

```json
"url": "https://github.com/YOUR_USERNAME/fansarr"
```

### metadata.js (lines ~8-11)

```javascript
source: 'https://github.com/YOUR_USERNAME/fansarr',
updateURL: 'https://github.com/YOUR_USERNAME/fansarr/releases/latest/download/fansarr.meta.js',
downloadURL: 'https://github.com/YOUR_USERNAME/fansarr/releases/latest/download/fansarr.user.js',
supportURL: 'https://github.com/YOUR_USERNAME/fansarr',
```

## After Upload

Once uploaded, users can install Fansarr by:

1. Downloading `fansarr.user.js` from your repository's Releases section
2. Or using the direct URL from the metadata file

## Optional: Create First Release

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `Fansarr v1.0.0`
5. Upload the `fansarr.user.js` and `fansarr.meta.js` files from the `dist/` folder
6. Publish release

This will make the userscript automatically updatable for users!
