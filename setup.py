
from setuptools import setup, find_packages

VERSION = '0.0.3'

setup(
    name="mkdocs_ponylang",
    version=VERSION,
    url='http://www.mkdocs.org',
    license='BSD',
    description='Ponylang theme for MkDocs',
    author='Matthias Wahl',
    author_email='matthiaswahl@m7w3.de',
    packages=find_packages(),
    include_package_data=True,
    entry_points={
        'mkdocs.themes': [
            'ponylang = mkdocs_ponylang',
        ]
    },
    zip_safe=False
)
