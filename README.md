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

eleves-ig2i.org :
- error	no-ig2i-prefix

ig2i-le1-sda1-2018-tp3 :
- error	no-travis

ig2i-le1-sda1-2018-tp4 :
- error	no-travis

ig2i-le1-sda1-2018-tp5 :
- error	no-travis

ig2i-le1-web-2018-tp1 :
- error	no-travis

ig2i-le3-poo-2016-ctp1 :
- error	no-travis

ig2i-le3-poo-2017-ctp2 :
- error	no-travis

ig2i-le3-poo-2018-ctp1 :
- error	no-travis

ig2i-le3-prs-2018-ctp1 :
- error	no-travis

ig2i-le4-dwm-2018-tp-symfony :
- error	no-travis

ig2i-le4-ii-2017-train_controller :
- error	no-travis

ig2i-le4-prp-2018-dataflow :
- error	no-travis

ig2i-le4-webservice-2018-tp1-soap :
- error	no-travis

ig2i-le4-webservice-2018-tp2-rest :
- error	no-travis

ig2i-le4-wma-2018-tp1 :
- error	no-travis

ig2i-menus :
- error	no-travis

ig2i-ri-2016 :
- error	no-travis

ig2i-ri-2018 :
- error	no-travis

