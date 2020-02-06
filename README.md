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

ig2i-jpo-2020-cmj :
- error	no-travis

ig2i-jpo-2020-mpm :
- error	no-travis

ig2i-jpo-2020-poo-l3 :
- error	no-travis

ig2i-jpo-2020-prs :
- error	no-travis

ig2i-l3-lpe-ds :
- error	no-travis

ig2i-la1-poo3-tp1 :
- error	no-travis

ig2i-la1-prs-2020-tp1 :
- error	no-travis

ig2i-la1-prs-2020-tp2 :
- error	no-travis

ig2i-la1-prs-2020-tp3 :
- error	no-travis

ig2i-la1-prs-2020-tp4 :
- error	no-travis

ig2i-la1-prs-2020-tp5 :
- error	no-travis

ig2i-le1-sda1-2018-tp3 :
- error	no-travis

ig2i-le1-sda1-2018-tp4 :
- error	no-travis

ig2i-le1-sda1-2018-tp5 :
- error	no-travis

ig2i-le1-sda1-2018-tp6 :
- error	no-travis

ig2i-le1-sda1-2018-tp7 :
- error	no-travis

ig2i-le1-sda1-2018-tp8 :
- error	no-travis

ig2i-le1-web-2018-tp1 :
- error	no-travis

ig2i-le2-csi2-2019-tp1 :
- error	no-travis

ig2i-le2-csi2-2019-tp3 :
- error	no-travis

ig2i-le2-poo2-2016-ctp2 :
- error	no-travis

ig2i-le2-poo2-2018-ctp1 :
- error	no-travis

ig2i-le2-poo2-2019-Chargement :
- error	no-travis
- error	repo-name-uppercase

ig2i-le2-poo2-2019-ctp1 :
- error	no-travis

ig2i-le2-poo2-2019-Formule1 :
- error	no-travis
- error	repo-name-uppercase

ig2i-le2-poo2-2019-Livraison :
- error	no-travis
- error	repo-name-uppercase

ig2i-le2-poo2-2019-masquesConfettis :
- error	no-travis
- error	repo-name-uppercase

ig2i-le2-poo2-2019-Paint :
- error	no-travis
- error	repo-name-uppercase

ig2i-le2-sda2-2014-ctp :
- error	no-travis

