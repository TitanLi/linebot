# git
## Git取消追蹤檔案
### Method 1 `git rm`
#### Step 1: Run this comment
```
$ git rm --cached filename         # for file
$ git rm -r --cached foldername    # for folder
```
#### Step 2: edit .gitignore
把你要 ignore 的檔案寫進 .gitignore
### Method 2 `git update-index`
#### to untracked file
```
$ git update-index --assume-unchanged <file>
```
#### to retracked file
```
$ git update-index --no-assume-unchanged <file>
```
這個方法一樣可以 untracked file，但是這個比較像是 暫時性處置
如果你有一些 file 只是暫時不想要被紀錄，可以用這個方式移除
如果你是想要永久性的 untracked，請使用 git rm
