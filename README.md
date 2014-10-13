
## Update wiki content

First (one time only):

    cd wiki
    git submodule init
    git pull
    
To update the public site with content from this wiki, run:

    cd wiki
    git pull
    git submodule update
    cd ..
    git commit -am "wiki updated" 

See https://help.github.com/articles/using-submodules-with-pages for 
details about linking the wiki with the website.
