# Quiz - Session 1: Linux Commands & Git Basics (GRADED)

## Your Score: 20/26 (77%) - Good Job! 🎉

---

## Part 1: Linux Commands (10 questions)

### 1. What does `mkdir` stand for?
**Your answer:** it stands for make directory

✅ **CORRECT!** Perfect.

---

### 2. What is the difference between `mkdir folder` and `mkdir -p path/to/folder`?
**Your answer:** mkdir will create folder only, wwith -p it will create all parent folders too

✅ **CORRECT!** Exactly right. `-p` creates parent directories if they don't exist.

---

### 3. What does the `touch` command do?
**Your answer:** it cretes file

✅ **CORRECT!** (Minor typo: "creates" not "cretes", but you got the concept!)

**Full answer:** `touch` creates an empty file if it doesn't exist, or updates the timestamp if it does.

---

### 4. If you want to see all files in a directory including hidden ones, what command would you use?
**Your answer:** ls makes you to see whas in directory, with -la it will show all files including hidden ones

✅ **CORRECT!** The command is `ls -la` (or `ls -a` works too).

---

### 5. What does `cat filename.txt` do?
**Your answer:** it ill sho on terminal the filename content

✅ **CORRECT!** It displays the file contents in the terminal.

---

### 6. What is the difference between `ls` and `ls -la`?
**Your answer:** ls makes you to see whas in directory, with -la it will show all files including hidden ones

✅ **CORRECT!** Also, `-l` gives you the "long format" with permissions, size, date, etc.

---

### 7. How would you create three folders at once named `components`, `store`, and `utils`?
**Your answer:** mkdir components store utils

✅ **CORRECT!** Perfect syntax.

---

### 8. What does the `-v` flag do in `mkdir -v`?
**Your answer:** it will write what has mkdir done, verbosly

✅ **CORRECT!** Verbose mode - it tells you what it did.

---

### 9. What does the `.` mean in a file path (like `./src/App.jsx`)?
**Your answer:** it means current directory

✅ **CORRECT!** Exactly.

---

### 10. What does `~` represent in Linux paths (like `~/.ssh/`)?
**Your answer:** dont know

❌ **INCORRECT**

**Correct answer:** `~` represents your **home directory** (e.g., `/home/gevorg/`). It's a shortcut so you don't have to type the full path.

**Example:** `~/.ssh/` is the same as `/home/gevorg/.ssh/`

---

## Part 2: Git Basics (10 questions)

### 11. What does `git init` do?
**Your answer:** it initiated git repository on directory and create secret git folder

✅ **CORRECT!** It creates the `.git` folder (which is hidden, hence "secret").

---

### 12. What is the difference between `git add .` and `git add filename.txt`?
**Your answer:** `git add .` will add all files to staging area, `git add filename.txt` will add only filename.txt to staging area

✅ **CORRECT!** Perfect explanation.

---

### 13. What does the `-m` flag mean in `git commit -m "message"`?
**Your answer:** its commit messsage

✅ **CORRECT!** The `-m` stands for "message".

---

### 14. What is the purpose of `git remote add origin <url>`?
**Your answer:** it will add remote repository to your local repository

✅ **CORRECT!** It links your local repo to a remote one (like GitHub).

---

### 15. What does `git push -u origin main` do? What does the `-u` flag mean?
**Your answer:** it ill push main branch to remote repository

⚠️ **PARTIALLY CORRECT** (You got the main part, but missed the `-u` explanation)

**Full answer:** It pushes your `main` branch to the remote. The `-u` flag sets the "upstream" tracking, so next time you can just type `git push` without specifying `origin main`.

---

### 16. If you want to see what files have been changed but not yet committed, what command would you use?
**Your answer:** dont kno

❌ **INCORRECT**

**Correct answer:** `git status`

This shows you which files are modified, staged, or untracked.

---

### 17. What is the difference between `git commit -m "message"` and `git commit --amend`?
**Your answer:** `git commit -m "message"` will create new commit, `git commit --amend` will change last commit

✅ **CORRECT!** `--amend` modifies the previous commit instead of creating a new one.

---

### 18. What does `git add -p` do?
**Your answer:** dont kno

❌ **INCORRECT**

**Correct answer:** `git add -p` (patch mode) lets you stage changes **chunk by chunk**. It asks you "Do you want to stage this change?" for each piece of code you modified. Super useful for making clean, focused commits.

---

### 19. Why did we need to set up an SSH key for GitHub?
**Your answer:** do commit from terminal ithout loggin in every time

✅ **CORRECT!** SSH allows secure authentication without typing passwords.

---

### 20. What command tests if your SSH connection to GitHub is working?
**Your answer:** dont know

❌ **INCORRECT**

**Correct answer:** `ssh -T git@github.com`

We used this command together! It tests the connection and GitHub responds with "Hi [username]!"

---

## Part 3: Practical Scenarios (5 questions)

### 21. You want to create a new file called `test.js` in the `src` folder. Write the exact command.
**Your answer:** touch ./src/test.js

✅ **CORRECT!** (You could also write `touch src/test.js` without the `./`)

---

### 22. You made changes to 3 files. Write the commands to stage them, commit them with message "Update files", and push to GitHub.
**Your answer:**
```
git add <file1> <file2> <file3>
git commit -m "Update files"
git push
```

✅ **CORRECT!** Perfect workflow.

---

### 23. You accidentally committed something and want to fix the commit message. What command do you use?
**Your answer:** dont remember

❌ **INCORRECT**

**Correct answer:** `git commit --amend`

We covered this in question 17! You knew it there. 😊

---

### 24. You want to see the contents of your SSH public key. What command would you use?
**Your answer:** cat ~/.ssh/id_ed25519.pub

✅ **CORRECT!** Exactly what we did together.

---

### 25. You created a folder called `components` but spelled it wrong as `componets`. How would you delete it and create the correct one?
**Your answer:**
```
rm -r componets
mkdir components
```

✅ **CORRECT!** Perfect. The `-r` flag means "recursive" (delete the folder and everything inside).

---

## Bonus Challenge 🌟

### 26. Explain in your own words: What is the difference between your "local repository" and the "remote repository" on GitHub?
**Your answer:** local repository is on your computer, remote repository is on github

✅ **CORRECT!** Simple and accurate.

---

## Summary

**Total Score: 20/26 (77%)**

### What you nailed ✅
- All basic Linux commands (`mkdir`, `touch`, `cat`, `ls`)
- Core Git concepts (`init`, `add`, `commit`, `push`, `remote`)
- Practical command usage
- SSH key location

### What to review for next time 📚
1. **`~` symbol** - Your home directory shortcut
2. **`git status`** - Check what's changed
3. **`git add -p`** - Stage changes in chunks
4. **`ssh -T git@github.com`** - Test SSH connection
5. **`-u` flag in git push** - Sets upstream tracking

**Overall: Great job!** You clearly understood the core concepts. The ones you missed were mostly advanced features we'll use more as we continue.

---

**Next Quiz Preview:** We'll add questions about:
- Zustand state management
- React components
- CSS variables
- More Git workflows
