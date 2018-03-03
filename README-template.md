# IG2I meta
A repo to report everything.
```
R E P O R T
E     P   R
P     E   O
O P E R   P
R         E
T R O P E R
```
## How it works
The workflow for this project is quite simple :
- a Travis CI job runs daily ;
- this job gets le list of all the repos of the organisation with a call to https://api.github.com/users/eleves-ig2i/repos ;
- for each repo rules are checked ;
- a report is generated ;
- [README.md](README.md) is updated with the new report ;
- Travis CI commits the new [README.md](README.md) to the master branch of this repo.
## Report
${report}
