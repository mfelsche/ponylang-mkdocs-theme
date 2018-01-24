Ponylang Mkdocs Theme
=====================

Based on https://github.com/rtfd/sphinx_rtd_theme and https://github.com/mkdocs/mkdocs/tree/master/mkdocs/themes/readthedocs .

The sources for generating the theme files is mostly in ``src`` folder,
it is generated using ``webpack``. The theme itself is distributed as python package
and can be referenced in your ``mkdocs.yml`` as::

    theme: ponylang

Setup
-----

You need to have ``npm`` installed.
I installed it using `asdf <https://github.com/asdf-vm/asdf>`_,
but any installation method will do.

Install yarn to install further dependencies::

    npm install -g yarn
    yarn install


In order to regenerate the theme files inside the ``mkdocs_ponylang`` folder, run::

    webpack


The Webpack executable should be in your global node installation and thus on your path.
If not, search for it and add it to your path.

For an asdf installation, adding this to my shell initialization file (e.g. ``$HOME/.bashrc``) helped::

    export PATH="$HOME/.asdf/installs/nodejs/$(asdf which nodejs)/.npm/bin:$PATH"


Installation
------------

Local Development
.................

::

    git clone git@github.com:mfelsche/ponylang-mkdocs-theme.git
    cd ponylang-mkdocs-theme
    pip install -e .


From Git
........

::

    pip install -e git+https://github.com/mfelsche/ponylang-mkdocs-theme#egg=mkdocs_ponylang


From PyPI
.........

::

    pip install mkdocs-ponylang

Usage
-----

Reference this theme from your mkdocs.yml configuration file like so::

    theme: ponylang

Publishing
----------

The package is packaged and distributed on the `Python Package Index (PyPI) <https://pypi.python.org>`_.

::

    pip install -U wheel twine
    cd ponylang-mkdocs-theme
    rm -rf ./dist/*
    python setup.py sdist bdist_wheel
    twine upload
