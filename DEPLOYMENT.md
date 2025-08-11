# GitHub Pages Deployment Guide

This guide will help you deploy your AppsFlyer Web-to-App test site to GitHub Pages.

## 🚀 Quick Deployment Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `appsflyer-web-to-app-test`)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2. Upload Your Code

```bash
# Initialize git in your local project
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: AppsFlyer Web-to-App test site"

# Add your GitHub repository as remote
git remote add origin https://github.com/eunjoo-af/appsflyer-web-to-app-test-page.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** and **/(root)**
6. Click **Save**

### 4. Configure GitHub Actions (Optional)

The repository includes GitHub Actions workflows for automatic deployment:

- `.github/workflows/static.yml` - Modern GitHub Pages deployment
- `.github/workflows/deploy.yml` - Alternative deployment method

These will automatically deploy your site when you push to the main branch.

## 🌐 Your Live Site

After deployment, your site will be available at:
```
https://eunjoo-af.github.io/appsflyer-web-to-app-test-page
```

## 📝 Customization

### Update Repository URLs

After creating your repository, update these files with your actual repository information:

1. **README.md** - Replace `yourusername` and `your-repo-name` with your actual values
2. **Any documentation** that references the repository URL

### Custom Domain (Optional)

If you want to use a custom domain:

1. Go to repository **Settings** > **Pages**
2. Under **Custom domain**, enter your domain
3. Add a `CNAME` file to your repository with your domain name
4. Configure your DNS settings to point to `YOUR_USERNAME.github.io`

## 🔧 Troubleshooting

### Common Issues

**Site not loading:**
- Check that the repository is public
- Verify GitHub Pages is enabled in Settings
- Wait a few minutes for deployment to complete

**404 errors:**
- Ensure `index.html` is in the root directory
- Check that the branch is set to `main` in Pages settings

**Build errors:**
- Check the Actions tab for deployment logs
- Verify all files are committed and pushed

### Manual Deployment

If GitHub Actions isn't working:

1. Go to **Settings** > **Pages**
2. Select **Deploy from a branch**
3. Choose **main** branch and **/(root)** folder
4. Click **Save**

## 📊 Monitoring

- **Deployment status**: Check the Actions tab
- **Site analytics**: Available in repository Insights
- **Custom domain**: Monitor DNS propagation

## 🔐 Security Notes

- ✅ Repository is public (required for free GitHub Pages)
- ✅ No sensitive keys in the code
- ✅ All keys are user-provided through the web interface
- ✅ Safe for public sharing

## 🎯 Next Steps

1. **Test your live site** with your AppsFlyer keys
2. **Share the URL** with your team
3. **Monitor usage** through GitHub Insights
4. **Update documentation** as needed

---

Your AppsFlyer Web-to-App test site is now live and ready for use! 🎉 