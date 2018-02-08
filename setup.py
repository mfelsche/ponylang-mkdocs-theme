import os
from setuptools import setup, find_packages


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

VERSION = '0.0.14'

setup(
    name="mkdocs_ponylang",
    version=VERSION,
    url='http://www.mkdocs.org',
    license='BSD',
    description='Ponylang theme for MkDocs',
    long_description=read("README.rst"),
    author='Matthias Wahl',
    author_email='matthiaswahl@m7w3.de',
    packages=find_packages(),
    include_package_data=True,
    entry_points={
        'mkdocs.themes': [
            'ponylang = mkdocs_ponylang',
        ]
    },
    install_requires = [
        "mkdocs>=0.17.2,<0.18"
    ],
    zip_safe=False,
    classifiers=[
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',
        'Intended Audience :: Developers',
        'Development Status :: 4 - Beta',
    ]
)
