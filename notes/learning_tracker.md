# Learning Tracker - All Skills & Concepts

This file tracks everything you've learned. Use this as a reference for future projects!

---

## 🐧 Linux Commands

### File & Directory Management
- ✅ `mkdir` - Make directory
  - `-p` - Create parent directories
  - `-v` - Verbose output
- ✅ `touch` - Create empty file or update timestamp
  - `-c` - Don't create if doesn't exist
- ✅ `ls` - List directory contents
  - `-l` - Long format (permissions, size, date)
  - `-a` - Show hidden files
  - `-la` - Combine both
- ✅ `cat` - Display file contents
- ✅ `mv` - Move or rename files
  - `-i` - Interactive (ask before overwrite)
  - `-v` - Verbose
  - `-n` - Never overwrite
- ✅ `rm` - Remove files/directories
  - `-r` - Recursive (for directories)
  - `-f` - Force (no confirmation)

### Path Shortcuts
- ✅ `.` - Current directory
- ✅ `..` - Parent directory
- ✅ `~` - Home directory (`/home/gevorg/`)
- ✅ `/` - Root directory

### To Learn Next
- [ ] `cp` - Copy files
- [ ] `cd` - Change directory
- [ ] `pwd` - Print working directory
- [ ] `grep` - Search text in files
- [ ] `find` - Find files
- [ ] `chmod` - Change permissions
- [ ] `nano` / `vim` - Text editors

---

## 🔧 Git Commands

### Repository Setup
- ✅ `git init` - Initialize repository
  - `-b main` - Set default branch name
- ✅ `git remote add origin <url>` - Link to remote repo
- ✅ `git remote set-url origin <url>` - Change remote URL

### Basic Workflow
- ✅ `git status` - Check what's changed
- ✅ `git add .` - Stage all files
- ✅ `git add <file>` - Stage specific file
- ✅ `git add -p` - Stage chunks interactively
- ✅ `git commit -m "message"` - Commit with message
- ✅ `git commit --amend` - Fix last commit
- ✅ `git push -u origin main` - Push and set upstream
- ✅ `git push` - Push to tracked branch

### SSH Setup
- ✅ `ssh-keygen -t ed25519 -C "email"` - Generate SSH key
- ✅ `cat ~/.ssh/id_ed25519.pub` - View public key
- ✅ `ssh -T git@github.com` - Test SSH connection

### To Learn Next
- [ ] `git pull` - Fetch and merge changes
- [ ] `git clone` - Clone a repository
- [ ] `git branch` - Manage branches
- [ ] `git checkout` / `git switch` - Switch branches
- [ ] `git merge` - Merge branches
- [ ] `git log` - View commit history
- [ ] `git diff` - See changes
- [ ] `git stash` - Temporarily save changes
- [ ] `.gitignore` - Ignore files

---

## ⚛️ React & JavaScript

### Project Setup
- ✅ `npx create-vite@latest` - Create Vite project
- ✅ `npm install` - Install dependencies
- ✅ `npm install <package>` - Add new package
- ✅ Understanding `package.json`

### Concepts to Learn
- [ ] React components (functional)
- [ ] JSX syntax
- [ ] Props
- [ ] State (`useState`)
- [ ] Effects (`useEffect`)
- [ ] Event handlers
- [ ] Conditional rendering
- [ ] Lists and keys
- [ ] Forms and inputs

---

## 🎨 CSS & Styling

### Concepts to Learn
- [ ] CSS Variables (`:root`)
- [ ] Flexbox
- [ ] Grid
- [ ] Responsive design (media queries)
- [ ] Animations and transitions
- [ ] Glassmorphism effect
- [ ] Gradients

---

## 📦 State Management

### Zustand (To Learn)
- [ ] Create a store
- [ ] Define state
- [ ] Create actions (functions)
- [ ] Use store in components
- [ ] Persist middleware

---

## 🎭 Animations

### Framer Motion (To Learn)
- [ ] Basic animations
- [ ] Variants
- [ ] Gestures (hover, tap, drag)
- [ ] Layout animations
- [ ] Exit animations

---

## 🔥 Firebase (Planned)

### To Learn
- [ ] Create Firebase project
- [ ] Setup Firebase in React
- [ ] Authentication (Email, Google)
- [ ] Firestore database
- [ ] Read/Write data
- [ ] Real-time listeners
- [ ] Deploy to Firebase Hosting

---

## 🎯 Project Ideas to Practice Skills

### Beginner Projects
1. **Personal Portfolio**
   - Practice: HTML, CSS, React basics, Git
   
2. **Todo List (Simple)**
   - Practice: State management, forms, localStorage

3. **Weather App**
   - Practice: API calls, async/await, conditional rendering

### Intermediate Projects
4. **ZenTask (Current Project)**
   - Practice: Zustand, Framer Motion, Firebase, gamification

5. **Recipe Book**
   - Practice: CRUD operations, Firebase, image uploads

6. **Chat App**
   - Practice: Real-time data, authentication, Firestore

### Advanced Projects
7. **E-commerce Store**
   - Practice: Complex state, routing, payment integration

8. **Social Media Clone**
   - Practice: Everything combined!

---

## 📝 Best Practices Learned

- ✅ Always use meaningful commit messages
- ✅ Create folders to organize code (`components`, `store`, `notes`)
- ✅ Use CSS variables for consistent theming
- ✅ Keep notes and documentation
- ✅ Test commands with `-v` (verbose) to see what they do
- ✅ Use `-i` (interactive) flags for safety
- ✅ Break big projects into small steps

---

## 🎓 Learning Strategy

1. **Learn by doing** - Build real projects
2. **Quiz yourself** - Regular knowledge checks
3. **Document everything** - Keep notes
4. **Practice commands** - Don't just copy-paste
5. **Ask "why"** - Understand, don't memorize
6. **Review mistakes** - Learn from quiz errors

---

**Last Updated:** November 26, 2025
**Next Review:** When starting a new project or after completing ZenTask
